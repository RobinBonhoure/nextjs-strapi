# Template website

*Système de template digital avec administration de contenus sous [Nextjs](https://nextjs.org/) et [Strapi](https://strapi.io/)*
  
## Initialisation du projet

 - Dans le terminal `Yarn setup`

## Configuration Strapi (Back)

 - Dans le dossier `backend`, dupliquer le .env.example et le renommer en .env
 - Remplacer les variables pour la database dans le .env.
 - Pour lancer le back, dans le terminal command : `Yarn develop`
 - Créer votre accès administrateur au site

 **Import de la base de donnée de base**
 
 - Vérifier qu'on est bien dans le dossier  `backend`  dans le terminal
 - Dans le terminal : ` yarn strapi import -f ../base-db.tar.gz`
 
## Configuration Nextjs (Front)

 - Dans le dossier `frontend`, dupliquer le .env.example et le renommer en .env
 - Dans le panneau d'administration Strapi, naviguez dans Settings -> API Tokens et cliquez sur `Create new API Token.`
	 - **Name :** apiKey
	 - **Token duration :** Unlimited
	 - **Token type :** Read-only
 - Cliquer sur `save` et copier le token puis le coller dans le .env du dossier frontend dans la variable `NEXT_PUBLIC_STRAPI_API_TOKEN`
 - Changer la variable `NEXT_PUBLIC_CLIENT_NAME` avec le nom du client
 - Pour lancer le front, dans le terminal command : `Yarn dev`

## Command

**Run le back et le front en même temps**
A la racine du projet : `yarn dev`

**Reset le passwork de l'admin**

    yarn strapi admin:reset-user-password --email="YOUR_EMAIL" --password="YOUR_NEW_PASSWORD"