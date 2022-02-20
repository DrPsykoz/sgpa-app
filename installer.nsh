!macro customInstall
  CopyFiles /SILENT "$TEMP/sgpa_app/sgpa_backup.json" "$INSTDIR/static/data.json"
!macroend

!macro customRemoveFiles
  CopyFiles /SILENT /FILESONLY "$INSTDIR\static\data.json" "$TEMP/sgpa_app/sgpa_backup.json"
!macroend