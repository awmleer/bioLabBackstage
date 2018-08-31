ng build --base-href /backstage/ --prod --aot
rsync -avz dist/* slm:/var/www/bioLab/backstage/
