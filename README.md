# To start the game with Docker

1. ```bash
   docker build -t mancala .
   ```

````
2.  ```bash
docker run --name mancala-game -p "3000:3000" mancala
````

3. Visit http://localhost:3000
4. You can open a second browser to test real game play

# To start the game without docker

1. ```bash
   cd ./server
   npm run dev
   ```

```
2. Visit http://localhost:3000
```
