{{/*
Function to parse .env file and output in yaml
KEY_ENV1=VAL_ENV1      KEY_ENV1: base64(VAL_ENV1)
KEY_ENV2=VAL_ENV2  =>  KEY_ENV2: base64(VAL_ENV2)
KEY_ENV3=VAL_ENV3      KEY_ENV3: base64(VAL_ENV3)
Usage:
{{ tuple . "configs/backend/php-fpm/.env" | include "env.parseFile" | indent 2}}

*/}}
{{- define "env.parseFile" -}}
{{- $scope := index . 0 -}}
{{- $filePath := index . 1 -}}
{{- range $scope.Files.Lines $filePath -}}
{{- $a := splitn "=" 2 . -}}
{{- if not (hasPrefix "#" $a._0) }}
{{- if $a._1 -}}
{{ $a._0 }}: "{{ $a._1 }}"
{{ end -}}
{{ end -}}
{{- end -}}
{{- end -}}
