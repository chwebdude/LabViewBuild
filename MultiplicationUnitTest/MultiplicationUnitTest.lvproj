<?xml version='1.0' encoding='UTF-8'?>
<Project Type="Project" LVVersion="20008000">
	<Property Name="NI.LV.All.SourceOnly" Type="Bool">true</Property>
	<Item Name="My Computer" Type="My Computer">
		<Property Name="server.app.propertiesEnabled" Type="Bool">true</Property>
		<Property Name="server.control.propertiesEnabled" Type="Bool">true</Property>
		<Property Name="server.tcp.enabled" Type="Bool">false</Property>
		<Property Name="server.tcp.port" Type="Int">0</Property>
		<Property Name="server.tcp.serviceName" Type="Str">My Computer/VI Server</Property>
		<Property Name="server.tcp.serviceName.default" Type="Str">My Computer/VI Server</Property>
		<Property Name="server.vi.callsEnabled" Type="Bool">true</Property>
		<Property Name="server.vi.propertiesEnabled" Type="Bool">true</Property>
		<Property Name="specify.custom.address" Type="Bool">false</Property>
		<Item Name="Unit Test Files" Type="Folder">
			<Item Name="TestMult.lvtest" Type="TestItem" URL="../Unit Test Files/TestMult.lvtest">
				<Property Name="utf.test.bind" Type="Str">mult.vi</Property>
				<Property Name="utf.vector.test.bind" Type="Str">D04D789A-A827-F2AE-B8B4-01EC5F1D4FA4</Property>
			</Item>
			<Item Name="TestMult.lvvect" Type="TestVectorItem" URL="../Unit Test Files/TestMult.lvvect">
				<Property Name="utf.vector.test.bind" Type="Str">741BB31C-C678-8293-5150-7A8A2312D56A;D04D789A-A827-F2AE-B8B4-01EC5F1D4FA4</Property>
			</Item>
			<Item Name="TestMultOK.lvtest" Type="TestItem" URL="../Unit Test Files/TestMultOK.lvtest">
				<Property Name="utf.test.bind" Type="Str">mult.vi</Property>
				<Property Name="utf.vector.test.bind" Type="Str">741BB31C-C678-8293-5150-7A8A2312D56A</Property>
			</Item>
		</Item>
		<Item Name="Vis" Type="Folder">
			<Item Name="CreateReportDirectory.vi" Type="VI" URL="../Vis/CreateReportDirectory.vi"/>
			<Item Name="mult.vi" Type="VI" URL="../Vis/mult.vi"/>
			<Item Name="OpenWindowsExplorer.vi" Type="VI" URL="../Vis/OpenWindowsExplorer.vi"/>
		</Item>
		<Item Name="LaunchUnitTests.vi" Type="VI" URL="../LaunchUnitTests.vi"/>
		<Item Name="Main.vi" Type="VI" URL="../Main.vi"/>
		<Item Name="Dependencies" Type="Dependencies">
			<Item Name="vi.lib" Type="Folder">
				<Item Name="Clear Errors.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Clear Errors.vi"/>
				<Item Name="Error Cluster From Error Code.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Error Cluster From Error Code.vi"/>
				<Item Name="JUnit API.lvlib" Type="Library" URL="/&lt;vilib&gt;/NI/JUnit Results API/JUnit API.lvlib"/>
				<Item Name="NI_XML.lvlib" Type="Library" URL="/&lt;vilib&gt;/xml/NI_XML.lvlib"/>
				<Item Name="Simple XML.lvlib" Type="Library" URL="/&lt;vilib&gt;/NI/Simple XML/Simple XML.lvlib"/>
				<Item Name="Space Constant.vi" Type="VI" URL="/&lt;vilib&gt;/dlg_ctls.llb/Space Constant.vi"/>
				<Item Name="System Exec.vi" Type="VI" URL="/&lt;vilib&gt;/Platform/system.llb/System Exec.vi"/>
				<Item Name="utf junit report.lvlib" Type="Library" URL="/&lt;vilib&gt;/NI/UTF Junit Report/utf junit report.lvlib"/>
				<Item Name="VariantType.lvlib" Type="Library" URL="/&lt;vilib&gt;/Utility/VariantDataType/VariantType.lvlib"/>
			</Item>
			<Item Name="DOMUserDefRef.dll" Type="Document" URL="DOMUserDefRef.dll">
				<Property Name="NI.PreserveRelativePath" Type="Bool">true</Property>
			</Item>
		</Item>
		<Item Name="Build Specifications" Type="Build">
			<Item Name="Multiplication" Type="EXE">
				<Property Name="App_copyErrors" Type="Bool">true</Property>
				<Property Name="App_INI_aliasGUID" Type="Str">{4F2B88D8-79B2-4DD8-8038-2065CC626025}</Property>
				<Property Name="App_INI_GUID" Type="Str">{80D68D59-5722-452E-8465-972B2D06855D}</Property>
				<Property Name="App_serverConfig.httpPort" Type="Int">8002</Property>
				<Property Name="App_serverType" Type="Int">1</Property>
				<Property Name="Bld_buildCacheID" Type="Str">{A6A74FDD-97A7-4733-882E-BB197B482759}</Property>
				<Property Name="Bld_buildSpecName" Type="Str">Multiplication</Property>
				<Property Name="Bld_excludeInlineSubVIs" Type="Bool">true</Property>
				<Property Name="Bld_excludeLibraryItems" Type="Bool">true</Property>
				<Property Name="Bld_excludePolymorphicVIs" Type="Bool">true</Property>
				<Property Name="Bld_localDestDir" Type="Path">/D/LabVIEW/git/builds/NI_AB_PROJECTNAME/App</Property>
				<Property Name="Bld_modifyLibraryFile" Type="Bool">true</Property>
				<Property Name="Bld_previewCacheID" Type="Str">{69F5382A-63B2-47F7-902E-976726BC1E96}</Property>
				<Property Name="Bld_supportedLanguage[0]" Type="Str">English</Property>
				<Property Name="Bld_supportedLanguageCount" Type="Int">1</Property>
				<Property Name="Bld_version.major" Type="Int">1</Property>
				<Property Name="Destination[0].destName" Type="Str">Multiplication.exe</Property>
				<Property Name="Destination[0].path" Type="Path">/D/LabVIEW/git/builds/NI_AB_PROJECTNAME/App/Multiplication.exe</Property>
				<Property Name="Destination[0].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="Destination[0].preserveHierarchy" Type="Bool">true</Property>
				<Property Name="Destination[0].type" Type="Str">App</Property>
				<Property Name="Destination[1].destName" Type="Str">Support Directory</Property>
				<Property Name="Destination[1].path" Type="Path">/D/LabVIEW/git/builds/NI_AB_PROJECTNAME/App/data</Property>
				<Property Name="Destination[1].path.type" Type="Str">&lt;none&gt;</Property>
				<Property Name="DestinationCount" Type="Int">2</Property>
				<Property Name="Source[0].itemID" Type="Str">{B25BADE2-7B68-4BD9-9411-9FD83725C15F}</Property>
				<Property Name="Source[0].type" Type="Str">Container</Property>
				<Property Name="Source[1].destinationIndex" Type="Int">0</Property>
				<Property Name="Source[1].itemID" Type="Ref">/My Computer/Main.vi</Property>
				<Property Name="Source[1].sourceInclusion" Type="Str">TopLevel</Property>
				<Property Name="Source[1].type" Type="Str">VI</Property>
				<Property Name="SourceCount" Type="Int">2</Property>
				<Property Name="TgtF_companyName" Type="Str">METAS</Property>
				<Property Name="TgtF_fileDescription" Type="Str">Multiplication</Property>
				<Property Name="TgtF_internalName" Type="Str">Multiplication</Property>
				<Property Name="TgtF_legalCopyright" Type="Str">Copyright © 2021 METAS</Property>
				<Property Name="TgtF_productName" Type="Str">Multiplication</Property>
				<Property Name="TgtF_targetfileGUID" Type="Str">{7AD2653C-6A30-4F77-9D24-D1DA079791C2}</Property>
				<Property Name="TgtF_targetfileName" Type="Str">Multiplication.exe</Property>
				<Property Name="TgtF_versionIndependent" Type="Bool">true</Property>
			</Item>
			<Item Name="Multiplication - Package" Type="{E661DAE2-7517-431F-AC41-30807A3BDA38}">
				<Property Name="NIPKG_addToFeed" Type="Bool">true</Property>
				<Property Name="NIPKG_allDependenciesToFeed" Type="Bool">false</Property>
				<Property Name="NIPKG_allDependenciesToSystemLink" Type="Bool">false</Property>
				<Property Name="NIPKG_certificates" Type="Bool">true</Property>
				<Property Name="NIPKG_createInstaller" Type="Bool">false</Property>
				<Property Name="NIPKG_feedLocation" Type="Path">/D/LabVIEW/git/builds/NI_AB_PROJECTNAME/Feed</Property>
				<Property Name="NIPKG_installerArtifacts" Type="Str"></Property>
				<Property Name="NIPKG_installerBuiltBefore" Type="Bool">false</Property>
				<Property Name="NIPKG_installerDestination" Type="Path">../builds/NI_AB_PROJECTNAME/Multiplication - Package/Package Installer</Property>
				<Property Name="NIPKG_installerDestination.Type" Type="Str">relativeToCommon</Property>
				<Property Name="NIPKG_lastBuiltPackage" Type="Str">multiplication-packate_1.0.0-0_windows_all.nipkg</Property>
				<Property Name="NIPKG_license" Type="Ref"></Property>
				<Property Name="NIPKG_packageVersion" Type="Bool">false</Property>
				<Property Name="NIPKG_releaseNotes" Type="Str"></Property>
				<Property Name="NIPKG_storeProduct" Type="Bool">false</Property>
				<Property Name="NIPKG_VisibleForRuntimeDeployment" Type="Bool">false</Property>
				<Property Name="PKG_actions.Count" Type="Int">0</Property>
				<Property Name="PKG_autoIncrementBuild" Type="Bool">false</Property>
				<Property Name="PKG_autoSelectDeps" Type="Bool">true</Property>
				<Property Name="PKG_buildNumber" Type="Int">0</Property>
				<Property Name="PKG_buildSpecName" Type="Str">Multiplication - Package</Property>
				<Property Name="PKG_dependencies.Count" Type="Int">1</Property>
				<Property Name="PKG_dependencies[0].Enhanced" Type="Bool">false</Property>
				<Property Name="PKG_dependencies[0].MaxVersion" Type="Str"></Property>
				<Property Name="PKG_dependencies[0].MaxVersionInclusive" Type="Bool">false</Property>
				<Property Name="PKG_dependencies[0].MinVersion" Type="Str">20.1.0.49152-0+f0</Property>
				<Property Name="PKG_dependencies[0].MinVersionType" Type="Str">Inclusive</Property>
				<Property Name="PKG_dependencies[0].NIPKG.DisplayName" Type="Str">LabVIEW Runtime (32-bit)</Property>
				<Property Name="PKG_dependencies[0].Package.Name" Type="Str">ni-labview-2020-runtime-engine-x86</Property>
				<Property Name="PKG_dependencies[0].Package.Section" Type="Str">Programming Environments</Property>
				<Property Name="PKG_dependencies[0].Package.Synopsis" Type="Str">The LabVIEW Runtime is a software add-on that enables engineers to run executables on a nondevelopment machine.</Property>
				<Property Name="PKG_dependencies[0].Relationship" Type="Str">Required Dependency</Property>
				<Property Name="PKG_dependencies[0].Type" Type="Str">NIPKG</Property>
				<Property Name="PKG_description" Type="Str"></Property>
				<Property Name="PKG_destinations.Count" Type="Int">1</Property>
				<Property Name="PKG_destinations[0].ID" Type="Str">{82D81E7D-71AC-41D8-A446-F88F7982CF8C}</Property>
				<Property Name="PKG_destinations[0].Subdir.Directory" Type="Str">MultiplicationUnitTest</Property>
				<Property Name="PKG_destinations[0].Subdir.Parent" Type="Str">root_5</Property>
				<Property Name="PKG_destinations[0].Type" Type="Str">Subdir</Property>
				<Property Name="PKG_displayName" Type="Str">Multiplication package</Property>
				<Property Name="PKG_displayVersion" Type="Str"></Property>
				<Property Name="PKG_feedDescription" Type="Str"></Property>
				<Property Name="PKG_feedName" Type="Str"></Property>
				<Property Name="PKG_homepage" Type="Str"></Property>
				<Property Name="PKG_hostname" Type="Str"></Property>
				<Property Name="PKG_maintainer" Type="Str">METAS &lt;&gt;</Property>
				<Property Name="PKG_output" Type="Path">/D/LabVIEW/git/builds/NI_AB_PROJECTNAME/Package</Property>
				<Property Name="PKG_packageName" Type="Str">multiplication-packate</Property>
				<Property Name="PKG_publishToSystemLink" Type="Bool">false</Property>
				<Property Name="PKG_section" Type="Str">Application Software</Property>
				<Property Name="PKG_shortcuts.Count" Type="Int">1</Property>
				<Property Name="PKG_shortcuts[0].Destination" Type="Str">root_8</Property>
				<Property Name="PKG_shortcuts[0].Name" Type="Str">Multiplication</Property>
				<Property Name="PKG_shortcuts[0].Path" Type="Path">MultiplicationUnitTest</Property>
				<Property Name="PKG_shortcuts[0].Target.Child" Type="Str">{7AD2653C-6A30-4F77-9D24-D1DA079791C2}</Property>
				<Property Name="PKG_shortcuts[0].Target.Destination" Type="Str">{82D81E7D-71AC-41D8-A446-F88F7982CF8C}</Property>
				<Property Name="PKG_shortcuts[0].Target.Source" Type="Ref">/My Computer/Build Specifications/Multiplication</Property>
				<Property Name="PKG_shortcuts[0].Type" Type="Str">NIPKG</Property>
				<Property Name="PKG_sources.Count" Type="Int">1</Property>
				<Property Name="PKG_sources[0].Destination" Type="Str">{82D81E7D-71AC-41D8-A446-F88F7982CF8C}</Property>
				<Property Name="PKG_sources[0].ID" Type="Ref">/My Computer/Build Specifications/Multiplication</Property>
				<Property Name="PKG_sources[0].Type" Type="Str">EXE Build</Property>
				<Property Name="PKG_synopsis" Type="Str">MultiplicationUnitTest</Property>
				<Property Name="PKG_version" Type="Str">1.0.0</Property>
			</Item>
		</Item>
	</Item>
</Project>
