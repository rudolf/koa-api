# koa-api

### Usage
1. Start the server: `npm start`

2. Create a user
   ```
     curl --request POST \
       --url http://localhost:3000/users \
       --header 'content-type: application/json' \
       --data '{"name": "rudolf", "email": "rudolf@gmail.com", "password": "dontlook"}'
   ```

3. List users 
   ```
   curl --request GET \
     --url http://localhost:3000/users \
     --header 'content-type: application/json'
   ```

### Test
`npm test`
