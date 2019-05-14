import tl = require('azure-pipelines-task-lib/task');
import parser = require('fast-xml-parser');
import parserToXml = parser.j2xParser;
import fs = require('fs');
import { isArray } from 'util';
import { isatty } from 'tty';


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
        const projectfile: string = tl.getPathInput('projectFile', true);
        const buildSpecName: string = tl.getInput('buildSpecName', true);
        const targetName: string = tl.getInput('targetName', true);
        const outputDirectory: string = tl.getPathInput('outputDirectory', true);

        const majorVersion: number = parseInt(tl.getInput('majorVersion'));
        const minorVersion: number = parseInt(tl.getInput('minorVersion'));
        const patchVersion: number = parseInt(tl.getInput('patchVersion'));
        const buildVersion: number = parseInt(tl.getInput('buildVersion'));

        const companyName: string = tl.getInput('companyName');
        const fileDescription: string = tl.getInput('fileDescription');
        const internalName: string = tl.getInput('internalName');
        const copyright: string = tl.getInput('copyright');
        const productName: string = tl.getInput('productName');


        console.log('Using project file:', projectfile);
        console.log('Target Name:', targetName);
        console.log('Build specification:', buildSpecName);


        var content = fs.readFileSync(projectfile).toString();


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



        // Select data        
        var target = getTarget(targetName, obj);
        var buildSpecification = <Item>searchItem(buildSpecName, target);

        // Major
        setOrAdd(new Property("Bld_autoIncrement", "Bool", "false"), buildSpecification);

        if (majorVersion >= 0) {
            setOrAdd(new Property("Bld_version.major", "Int", majorVersion.toString()), buildSpecification);
            console.log("Updated Major version to ", majorVersion);
        }
        if (minorVersion >= 0) {
            setOrAdd(new Property("Bld_version.minor", "Int", minorVersion.toString()), buildSpecification);
            console.log("Updated Minor version to ", minorVersion);
        }
        if (patchVersion >= 0) {
            setOrAdd(new Property("Bld_version.patch", "Int", patchVersion.toString()), buildSpecification);
            console.log("Updated Patch version to ", patchVersion);
        }
        if (buildVersion >= 0) {
            setOrAdd(new Property("Bld_version.build", "Int", buildVersion.toString()), buildSpecification);
            console.log("Updated Build version to ", buildVersion);
        }

        if (companyName != undefined) {
            setOrAdd(new Property("TgtF_companyName", "Str", companyName), buildSpecification);
            console.log("Updated Company Name to ", companyName);
        }

        if (fileDescription != undefined) {
            setOrAdd(new Property("TgtF_fileDescription", "Str", fileDescription), buildSpecification);
            console.log("Updated File Description to ", fileDescription);
        }

        if (internalName != undefined) {
            setOrAdd(new Property("TgtF_internalName", "Str", internalName), buildSpecification);
            console.log("Updated Internal Name to ", internalName);
        }

        if (copyright != undefined) {
            setOrAdd(new Property("TgtF_legalCopyright", "Str", copyright), buildSpecification);
            console.log("Updated Copyright to ", copyright);
        }

        if (productName != undefined) {
            setOrAdd(new Property("TgtF_productName", "Str", productName), buildSpecification);
            console.log("Updated Product Name to ", productName);
        }

        // Update output directory
        var localDestDirProp = (<IProperty[]>buildSpecification.Property).filter(prop => prop.attr_Name == "Bld_localDestDir")[0];
        var oldDestDir = localDestDirProp.text;
        var newDestPath = "/" + outputDirectory.replace(/\\/g, "/").replace(":", "");
        console.log("Outputfolder:", newDestPath);
        // localDestDirProp.text = newDestPath;


        // Write back 
        var toXml = new parserToXml(options);
        var xml = <string>toXml.parse(obj);

        // Replace all paths
        xml = xml.replace(new RegExp(oldDestDir, 'g'), newDestPath);
        console.log(oldDestDir + "a");

        xml = "<?xml version='1.0' encoding='UTF-8'?>\n" + xml;

        fs.writeFileSync(projectfile, xml);


        // Execute Build
        console.log("Start build...");

        var arg = ["-OperationName", "ExecuteBuildSpec", "-ProjectPath", projectfile, "-TargetName", targetName ];
        var runner = tl.tool("LabViewCli.exe").arg(arg);
        var result = await runner.exec();
        console.log("Result Code", result);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

function setOrAdd(newProperty: IProperty, item: Item) {
    var property = (<IProperty[]>item.Property).filter(prop => prop.attr_Name == newProperty.attr_Name);
    if (property.length == 0) {
        (<IProperty[]>item.Property).push(newProperty)
    } else {
        property[0].text = newProperty.text;
    }
}

function getTarget(name: string, lvFile: LvFile): Item {
    if (isArray(lvFile.Project.Item)) {
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
        return item;
    }

    if (isArray(item.Item)) {
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

run();