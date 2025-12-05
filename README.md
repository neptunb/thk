# THK
JS Event Loop Examples

# thk_examples Instructions

## Download from GitHub
https://github.com/neptunb/thk/blob/Zip-File-With-Local-Git-Repo/THK.zip

<img width="951" height="455" alt="THK-zip" src="https://github.com/user-attachments/assets/fb272e7b-9d68-4b84-8bcd-f37a57f6f43c" />



### Folder Structure

```
thk_examples
     |
     |-- my_localhost_git_origin      <-- this folder is used for git repository
     |-- README.txt
     |-- Screen X
     |-- THKJS                        <-- this folder has code examples
            |- backend
            |- docker-compose.yml
            |- Dockerfile
            |- frontend
```

## To Trace the Codes

1. Install **VS Code** on your computer.
2. Open the **THKJS** folder in VS Code.
3. Ensure the following extensions are installed:

   * GitLens (GitKraken)
   * JavaScript and TypeScript Nightly (Microsoft)
4. Select a **Git Tag** from the GitLens panel. It can be seen in the **Screen** view.
5. Checkout a tag from the list.
6. You should now see the code in:

   * `index.html` (Frontend)
   * `script.js` (Frontend)
   * `app.js` (Backend)

## To Run the Codes

1. Install **Docker Desktop** on your computer.
2. Open a new terminal console in the **THKJS** folder.
3. Run the following command:

   ```bash
   docker compose up --build
   ```

   Wait until the build process completes.
4. To test the running page, open a browser and navigate to:

   ```
   http://localhost:8080 
   http://localhost:3000
   ```
5. You should see the page. It contains one or more buttons depending on the selected code.
6. Press the button to test the code.

## To Stop Running Codes

1. Shut down the Docker container using this command:

   ```bash
   docker compose down
   ```
