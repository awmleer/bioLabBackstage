ng build --base-href / --prod --aot
rsync -avz dist/* slm:/var/www/bioLab/backstage/
