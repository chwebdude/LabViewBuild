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
    constructor(public attr_Name: string, public attr_Type:string, public text:string){};
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
        const projectfile: string = tl.getInput('projectFile', true);
        const buildSpecName: string = tl.getInput('buildSpecName', true);
        const targetName: string = tl.getInput('targetName', true);
        const outputDirectory: string = tl.getInput('outputDirectory', true);



        console.log('Using project file: ', projectfile);
        console.log('Target Name: ', targetName);
        console.log('Build specification: ', buildSpecName);


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

        console.log(obj.Project.attr_LVVersion);


        // Select data        
        var target = getTarget(targetName, obj);
        var buildSpecification = <Item>searchItem(buildSpecName, target);

        // var localDestDir = (<IProperty[]>buildSpecification.IProperty).filter(prop => prop.attr_Name == "Bld_localDestDir")[0].text;

        // Set Version
        // var autoincrement = (<IProperty[]>buildSpecification.IProperty).filter(prop => prop.attr_Name == "Bld_autoIncrement")[0];
        // autoincrement.text = "false";

        // Major
        setOrAdd(new Property("Bld_autoIncrement", "Bool", "false"), buildSpecification);
        setOrAdd(new Property("Bld_version.major", "Int", "100"), buildSpecification);
        setOrAdd(new Property("Bld_version.minor", "Int", "100"), buildSpecification);
        setOrAdd(new Property("Bld_version.patch", "Int", "100"), buildSpecification);
        setOrAdd(new Property("Bld_version.build", "Int", "100"), buildSpecification);




        // Write back 
        var toXml = new parserToXml(options);
        var xml = "<?xml version='1.0' encoding='UTF-8'?>\n" + toXml.parse(obj);

        fs.writeFileSync("C:\\Users\\i00202849\\Downloads\\Neuer Ordner (2)\\TEx (1).lvproj", xml);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

function setOrAdd(newProperty: IProperty, item: Item) {
    console.log(item,"mY ITEM");  
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