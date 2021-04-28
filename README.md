# LabViewBuild

Azure DevOps Task

A task to build NI LabVIEW projects. You can even set the verison of the resulting executable.

## Features

- Build a LabView Project according to it's specification name and target name to a specific output directory.

- Set the file major, minor, patcch and build versions. Autoincrement of build version will be set to off since this doesn't make any sense on a build environment. You should use a build server variable to set the build version instead the LabVIEW internal system.

- Set additional information like company name, file description and copyright.

### Package Build

When a package build is selected, all dependencies are built first. Make sure, that on the same build job these dependencies are not built yet. So ideally use this plugin only once in your job.

## Prepartion

You need to have a licenced LabVIEW version on the build server. At the same time the VI Server needs to be activated (Tools/Options/VI Server).

![VI Server](https://raw.githubusercontent.com/chwebdude/LabViewBuild/master/images/VIServer.png)

## Jenkins Users

If you are using Jenkins as your build service, consider to use the excellent Jenkins Plugin from [Kubes](https://www.kubes.ch/jenkins/).
