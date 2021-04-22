import tl = require('azure-pipelines-task-lib/task');
import parser = require('fast-xml-parser');
import parserToXml = parser.j2xParser;
import fs = require('fs');
import trm = require('azure-pipelines-task-lib/toolrunner');
import path = require('path');
import { debug, error } from 'azure-pipelines-task-lib/task';



interface IProperty {
    attr_Name: string;
    attr_Type: string;
    text: string;
}

class Property implements IProperty {
    constructor(public attr_Name: string, public attr_Type: string, public text: string) { };
}

interface Item {
    attr_Name: string;
    attr_URL: string;
    attr_Type: string
    Property: IProperty | IProperty[];
    Item: Item | Item[];
}

interface LvProj {
    attr_LVVersion: string;
    attr_Type: string;
    Property: IProperty | IProperty[];
    Item: Item | Item[];
}

interface LvFile {
    Project: LvProj;
}

async function run() {
    try {
        const projectfile = <string>tl.getPathInput('projectFile', true);
        const buildSpecName = <string>tl.getInput('buildSpecName', true);
        const targetName = <string>tl.getInput('targetName', true);
        var outputDirectory = tl.getPathInput('outputDirectory', true);
        outputDirectory = tl.resolve(outputDirectory);

        const majorVersion: number = parseInt(<string>tl.getInput('majorVersion'));
        const minorVersion: number = parseInt(<string>tl.getInput('minorVersion'));
        const patchVersion: number = parseInt(<string>tl.getInput('patchVersion'));
        const buildVersion: number = parseInt(<string>tl.getInput('buildVersion'));

        const companyName = tl.getInput('companyName');
        const fileDescription = tl.getInput('fileDescription');
        const internalName = tl.getInput('internalName');
        const copyright = tl.getInput('copyright');
        const productName = tl.getInput('productName');

        const portNumber: number = parseInt(<string>tl.getInput('portNumber', true));
        const retries: number = parseInt(<string>tl.getInput('retries'));
        const clipath = <string>tl.getInput('clipath', true);

        console.log('Using project file:', projectfile);
        console.log('Target Name:', targetName);
        console.log('Build specification:', buildSpecName);


        var content = fs.readFileSync(projectfile).toString();
        debug("Filecontent read");

        var options = {
            attributeNamePrefix: "attr_",
            textNodeName: "text",
            ignoreAttributes: false,
            ignoreNameSpace: false,
            allowBooleanAttributes: false,
            parseNodeValue: true,
            parseAttributeValue: true,
            trimValues: true,
        };

        var obj = <LvFile>parser.parse(content, options);
        debug("File parsed");


        // Select data 
        var target: Item;
        try {
            target = getTarget(targetName, obj);
            debug("Target selected");
        } catch (er) {
            error("Target named '" + targetName + "' not found");
            throw er;
        }

        // Get all build specifications
        let buildSepcificationsNode: Item;
        try {
            buildSepcificationsNode = <Item>searchItem("Build Specifications", target);
            debug("Item with name 'Build Specifications' selected. Hint: the name 'Build Specifications' is not settable by the build task");
        } catch (ex) {
            error("Node 'Build Specifications' not found");
            throw ex;
        }

        // Get specified build specification
        let buildSpecification: Item;
        try {
            buildSpecification = <Item>searchItem(buildSpecName, buildSepcificationsNode);
            debug("Buildspecification selected");
        } catch (ex) {
            error("Buildspecification named '" + buildSpecName + "' not found");
            throw ex;
        }


        // Determine build type
        let type = buildSpecification.attr_Type;
        let oldDestDir = "";
        let newDestPath = "";

        // EXECUTE REPLACEMENTS
        switch (type) {
            case "EXE":
                // Replace data for EXE builds    
                console.log("Detected Specification type: EXE");

                // Disable Autoincrement
                setOrAdd(new Property("Bld_autoIncrement", "Bool", "false"), buildSpecification);
                debug("Autoincrement set to false");

                if (majorVersion >= 0) {
                    setOrAdd(new Property("Bld_version.major", "Int", majorVersion.toString()), buildSpecification);
                    console.log("Updated Major version to: ", majorVersion);
                }
                if (minorVersion >= 0) {
                    setOrAdd(new Property("Bld_version.minor", "Int", minorVersion.toString()), buildSpecification);
                    console.log("Updated Minor version to: ", minorVersion);
                }
                if (patchVersion >= 0) {
                    setOrAdd(new Property("Bld_version.patch", "Int", patchVersion.toString()), buildSpecification);
                    console.log("Updated Patch version to: ", patchVersion);
                }
                if (buildVersion >= 0) {
                    setOrAdd(new Property("Bld_version.build", "Int", buildVersion.toString()), buildSpecification);
                    console.log("Updated Build version to: ", buildVersion);
                }

                if (companyName != undefined) {
                    setOrAdd(new Property("TgtF_companyName", "Str", companyName), buildSpecification);
                    console.log("Updated Company Name to: ", companyName);
                }

                if (fileDescription != undefined) {
                    setOrAdd(new Property("TgtF_fileDescription", "Str", fileDescription), buildSpecification);
                    console.log("Updated File Description to: ", fileDescription);
                }

                if (internalName != undefined) {
                    setOrAdd(new Property("TgtF_internalName", "Str", internalName), buildSpecification);
                    console.log("Updated Internal Name to: ", internalName);
                }

                if (copyright != undefined) {
                    setOrAdd(new Property("TgtF_legalCopyright", "Str", copyright), buildSpecification);
                    console.log("Updated Copyright to: ", copyright);
                }

                if (productName != undefined) {
                    setOrAdd(new Property("TgtF_productName", "Str", productName), buildSpecification);
                    console.log("Updated Product Name to: ", productName);
                }

                // Update output directory
                removeProperty("Bld_localDestDirType", buildSpecification);
                var localDestDirProp = (<IProperty[]>buildSpecification.Property).filter(prop => prop.attr_Name == "Bld_localDestDir")[0];
                oldDestDir = localDestDirProp.text;
                console.log("Old output folder: ", oldDestDir);
                newDestPath = "/" + outputDirectory.replace(/\\/g, "/").replace(":", "");
                console.log("New output folder:", newDestPath);

                // Update all Destination paths
                var count = parseInt((<IProperty[]>buildSpecification.Property).filter(prop => prop.attr_Name == "DestinationCount")[0].text);
                for (let index = 0; index < count; index++) {
                    setOrAdd(new Property("Destination[" + index + "].path.type", "Str", "&lt;none&gt;"), buildSpecification);
                }

                break;

            case "{E661DAE2-7517-431F-AC41-30807A3BDA38}":
                console.log("Detected Specification type: Package");

                // Disable Autoincrement
                setOrAdd(new Property("PKG_autoIncrementBuild", "Bool", "false"), buildSpecification);
                debug("Autoincrement set to false");

                // Set version number
                let version = majorVersion + "." + minorVersion + "." + patchVersion + "." + buildVersion;
                console.log("Set version to " + version);
                setOrAdd(new Property("PKG_version.major", "Str", version), buildSpecification);
                setOrAdd(new Property("PKG_displayVersion", "Str", version), buildSpecification);
                debug("Version number set");


                if (fileDescription != undefined) {
                    setOrAdd(new Property("PKG_description", "Str", fileDescription), buildSpecification);
                    console.log("Updated File Description to: ", fileDescription);
                }

                if (internalName != undefined) {
                    setOrAdd(new Property("PKG_packageName", "Str", internalName), buildSpecification);
                    console.log("Updated PKG_packageName to: ", internalName);
                }

                // if (copyright != undefined) {
                //     setOrAdd(new Property("TgtF_legalCopyright", "Str", copyright), buildSpecification);
                //     console.log("Updated Copyright to: ", copyright);
                // }

                if (productName != undefined) {
                    setOrAdd(new Property("PKG_displayName", "Str", productName), buildSpecification);
                    console.log("Updated PKG_displayName Name to: ", productName);
                }

                // Update output directory
                var localDestDirProp = (<IProperty[]>buildSpecification.Property).filter(prop => prop.attr_Name == "PKG_output")[0];
                removeProperty("PKG_output", buildSpecification);
                oldDestDir = localDestDirProp.text;
                console.log("Old output folder: ", oldDestDir);
                newDestPath = "/" + outputDirectory.replace(/\\/g, "/").replace(":", "");
                console.log("New output folder:", newDestPath);

                // Update all Destination paths
                setOrAdd(new Property("PKG_output", "Path", newDestPath), buildSpecification);

                break;
            default:
                error("Build Specification type '" + type + "' not yet supported");
                throw "Build Specification type '" + type + "' not yet supported";
        }



        // Write back 
        var toXml = new parserToXml(options);
        var xml = <string>toXml.parse(obj);

        // Replace all paths
        xml = xml.replace(new RegExp(oldDestDir, 'g'), newDestPath);

        xml = "<?xml version='1.0' encoding='UTF-8'?>\n" + xml;

        fs.writeFileSync(projectfile, xml);

        console.log("Projectfile updated!\n");

        // Execute Build
        for (let i = 1; i <= retries; i++) {
            try {
                console.log("Build attempt " + i);

                console.log("Starting build...");
                var logfilePath = tl.resolve("labviewbuild.log");
                var arg: string[] = ["-OperationName", "ExecuteBuildSpec", "-ProjectPath", projectfile, "-TargetName", targetName, "-BuildSpecName", buildSpecName, "-PortNumber", portNumber.toString(), "-LogFilePath", logfilePath];
                var runner: trm.ToolRunner = tl.tool(clipath).arg(arg);
                var result = runner.execSync();
                console.log("Result Code" + result.code);
                console.log(JSON.stringify(result));

                if (result.code == 0)
                    return;
            } catch (e) {
                tl.warning("Failed");
                tl.warning(e.message);
            }

        }
        tl.setResult(tl.TaskResult.Failed, "Failed to build project");
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

function setOrAdd(newProperty: IProperty, item: Item) {
    debug("new Property: " + item);
    var property = (<IProperty[]>item.Property).filter(prop => prop.attr_Name == newProperty.attr_Name);
    if (property.length == 0) {
        (<IProperty[]>item.Property).push(newProperty)
    } else {
        property[0].text = newProperty.text;
    }
}

function removeProperty(propertyName: string, item: Item) {
    item.Property = (<Property[]>item.Property).filter(prop => prop.attr_Name != propertyName);
}

function getTarget(name: string, lvFile: LvFile): Item {
    if (Array.isArray(lvFile.Project.Item)) {
        for (let index = 0; index < lvFile.Project.Item.length; index++) {
            var res = searchItem(name, lvFile.Project.Item[index]);
            if (res != null)
                return res;
        }
    } else {
        var item = searchItem(name, lvFile.Project.Item);
        if (item != null)
            return item;
    }
    throw "No item found with the name " + name;
}

function searchItem(name: string, item: Item): Item | null {
    if (item.attr_Name == name) {
        debug("FOUND");
        return item;
    }

    if (Array.isArray(item.Item)) {
        for (let index = 0; index < item.Item.length; index++) {
            var res = searchItem(name, item.Item[index]);
            if (res != null)
                return res;
        }

    } else {
        if (item.Item != undefined) {
            return searchItem(name, item.Item);
        }
    }
    return null;
}


function searchItemByType(type: string, item: Item): Item | null {
    if (item.attr_Type == type) {
        debug("FOUND");
        return item;
    }

    if (Array.isArray(item.Item)) {
        for (let index = 0; index < item.Item.length; index++) {
            var res = searchItemByType(type, item.Item[index]);
            if (res != null)
                return res;
        }

    } else {
        if (item.Item != undefined) {
            return searchItemByType(type, item.Item);
        }
    }
    return null;
}



run();