import app from "./app";
import config from "./modules/config";
const port = config.port;
const main = async () => {
  try {
    app.listen(port, () => {
      console.log(`Pre order manager server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error, "error in server ts file");
    process.exit(1)
  }
};


main()