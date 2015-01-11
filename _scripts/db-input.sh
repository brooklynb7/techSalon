#! /bin/bash
mongo techsalon-dev --eval "db.dropDatabase()" 
mongorestore -d techsalon-dev /Users/brooklynb7/百度云同步盘/techSalon/backup/techsalon-dev --drop