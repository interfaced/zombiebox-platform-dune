#! /usr/bin/awk -f

BEGIN {
	print "Content-type: text/plain"
	print ""

	while(( getline line < "/config/settings.properties") > 0 ) {
		split(line, parts, " = ")
		if (parts[1] == "interface_language") {
			print parts[2]
		}
	}
}
