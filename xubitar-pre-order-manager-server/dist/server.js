
   import { createRequire } from 'module';
   const require = createRequire(import.meta.url);
  

// src/app.ts
import express from "express";
import cors from "cors";

// src/modules/preorder/route.preorder.ts
import { Router } from "express";

// src/utils/sendResponse.ts
var sendResponse = (res, data) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
    errors: data.error
  });
};
var sendResponse_default = sendResponse;

// src/modules/preorder/controller.preorder.ts
import httpStatus from "http-status";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.8.0",
  "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
  "activeProvider": "sqlite",
  "inlineSchema": 'enum PreorderWhen {\n  REGARDLESS_OF_STOCK\n  OUT_OF_STOCK\n}\n\nenum Status {\n  ACTIVE\n  INACTIVE\n}\n\nmodel PreOrder {\n  id           String       @id @default(uuid())\n  name         String\n  products     Int\n  preOrderWhen PreorderWhen\n  status       Status\n  startsAt     DateTime\n  endsAt       DateTime?\n  createdAt    DateTime     @default(now())\n  updatedAt    DateTime     @updatedAt\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "sqlite"\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"PreOrder":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"products","kind":"scalar","type":"Int"},{"name":"preOrderWhen","kind":"enum","type":"PreorderWhen"},{"name":"status","kind":"enum","type":"Status"},{"name":"startsAt","kind":"scalar","type":"DateTime"},{"name":"endsAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","PreOrder.findUnique","PreOrder.findUniqueOrThrow","orderBy","cursor","PreOrder.findFirst","PreOrder.findFirstOrThrow","PreOrder.findMany","data","PreOrder.createOne","PreOrder.createMany","PreOrder.createManyAndReturn","PreOrder.updateOne","PreOrder.updateMany","PreOrder.updateManyAndReturn","create","update","PreOrder.upsertOne","PreOrder.deleteOne","PreOrder.deleteMany","having","_count","_avg","_sum","_min","_max","PreOrder.groupBy","PreOrder.aggregate","AND","OR","NOT","id","name","products","PreorderWhen","preOrderWhen","Status","status","startsAt","endsAt","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","set","increment","decrement","multiply","divide"]'),
  graph: "QQsQDBwAAC8AMB0AAAQAEB4AAC8AMB8BAAAAASABADAAISECADEAISMAADIjIiUAADMlIiZAADQAISdAADUAIShAADQAISlAADQAIQEAAAABACABAAAAAQAgDBwAAC8AMB0AAAQAEB4AAC8AMB8BADAAISABADAAISECADEAISMAADIjIiUAADMlIiZAADQAISdAADUAIShAADQAISlAADQAIQEnAAA2ACADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACAJHwEAAAABIAEAAAABIQIAAAABIwAAACMCJQAAACUCJkAAAAABJ0AAAAABKEAAAAABKUAAAAABAQgAAAkAIAkfAQAAAAEgAQAAAAEhAgAAAAEjAAAAIwIlAAAAJQImQAAAAAEnQAAAAAEoQAAAAAEpQAAAAAEBCAAACwAwAQgAAAsAMAkfAQA8ACEgAQA8ACEhAgA9ACEjAAA-IyIlAAA_JSImQABAACEnQABBACEoQABAACEpQABAACECAAAAAQAgCAAADgAgCR8BADwAISABADwAISECAD0AISMAAD4jIiUAAD8lIiZAAEAAISdAAEEAIShAAEAAISlAAEAAIQIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgBhUAADcAIBYAADgAIBcAADsAIBgAADoAIBkAADkAICcAADYAIAwcAAAaADAdAAAXABAeAAAaADAfAQAbACEgAQAbACEhAgAcACEjAAAdIyIlAAAeJSImQAAfACEnQAAgACEoQAAfACEpQAAfACEDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIAwcAAAaADAdAAAXABAeAAAaADAfAQAbACEgAQAbACEhAgAcACEjAAAdIyIlAAAeJSImQAAfACEnQAAgACEoQAAfACEpQAAfACEOFQAAJQAgGAAALgAgGQAALgAgKgEAAAABKwEAAAAELAEAAAAELQEAAAABLgEAAAABLwEAAAABMAEAAAABMQEALQAhMgEAAAABMwEAAAABNAEAAAABDRUAACUAIBYAACwAIBcAACUAIBgAACUAIBkAACUAICoCAAAAASsCAAAABCwCAAAABC0CAAAAAS4CAAAAAS8CAAAAATACAAAAATECACsAIQcVAAAlACAYAAAqACAZAAAqACAqAAAAIwIrAAAAIwgsAAAAIwgxAAApIyIHFQAAJQAgGAAAKAAgGQAAKAAgKgAAACUCKwAAACUILAAAACUIMQAAJyUiCxUAACUAIBgAACYAIBkAACYAICpAAAAAAStAAAAABCxAAAAABC1AAAAAAS5AAAAAAS9AAAAAATBAAAAAATFAACQAIQsVAAAiACAYAAAjACAZAAAjACAqQAAAAAErQAAAAAUsQAAAAAUtQAAAAAEuQAAAAAEvQAAAAAEwQAAAAAExQAAhACELFQAAIgAgGAAAIwAgGQAAIwAgKkAAAAABK0AAAAAFLEAAAAAFLUAAAAABLkAAAAABL0AAAAABMEAAAAABMUAAIQAhCCoCAAAAASsCAAAABSwCAAAABS0CAAAAAS4CAAAAAS8CAAAAATACAAAAATECACIAIQgqQAAAAAErQAAAAAUsQAAAAAUtQAAAAAEuQAAAAAEvQAAAAAEwQAAAAAExQAAjACELFQAAJQAgGAAAJgAgGQAAJgAgKkAAAAABK0AAAAAELEAAAAAELUAAAAABLkAAAAABL0AAAAABMEAAAAABMUAAJAAhCCoCAAAAASsCAAAABCwCAAAABC0CAAAAAS4CAAAAAS8CAAAAATACAAAAATECACUAIQgqQAAAAAErQAAAAAQsQAAAAAQtQAAAAAEuQAAAAAEvQAAAAAEwQAAAAAExQAAmACEHFQAAJQAgGAAAKAAgGQAAKAAgKgAAACUCKwAAACUILAAAACUIMQAAJyUiBCoAAAAlAisAAAAlCCwAAAAlCDEAACglIgcVAAAlACAYAAAqACAZAAAqACAqAAAAIwIrAAAAIwgsAAAAIwgxAAApIyIEKgAAACMCKwAAACMILAAAACMIMQAAKiMiDRUAACUAIBYAACwAIBcAACUAIBgAACUAIBkAACUAICoCAAAAASsCAAAABCwCAAAABC0CAAAAAS4CAAAAAS8CAAAAATACAAAAATECACsAIQgqCAAAAAErCAAAAAQsCAAAAAQtCAAAAAEuCAAAAAEvCAAAAAEwCAAAAAExCAAsACEOFQAAJQAgGAAALgAgGQAALgAgKgEAAAABKwEAAAAELAEAAAAELQEAAAABLgEAAAABLwEAAAABMAEAAAABMQEALQAhMgEAAAABMwEAAAABNAEAAAABCyoBAAAAASsBAAAABCwBAAAABC0BAAAAAS4BAAAAAS8BAAAAATABAAAAATEBAC4AITIBAAAAATMBAAAAATQBAAAAAQwcAAAvADAdAAAEABAeAAAvADAfAQAwACEgAQAwACEhAgAxACEjAAAyIyIlAAAzJSImQAA0ACEnQAA1ACEoQAA0ACEpQAA0ACELKgEAAAABKwEAAAAELAEAAAAELQEAAAABLgEAAAABLwEAAAABMAEAAAABMQEALgAhMgEAAAABMwEAAAABNAEAAAABCCoCAAAAASsCAAAABCwCAAAABC0CAAAAAS4CAAAAAS8CAAAAATACAAAAATECACUAIQQqAAAAIwIrAAAAIwgsAAAAIwgxAAAqIyIEKgAAACUCKwAAACUILAAAACUIMQAAKCUiCCpAAAAAAStAAAAABCxAAAAABC1AAAAAAS5AAAAAAS9AAAAAATBAAAAAATFAACYAIQgqQAAAAAErQAAAAAUsQAAAAAUtQAAAAAEuQAAAAAEvQAAAAAEwQAAAAAExQAAjACEAAAAAAAABNQEAAAABBTUCAAAAATYCAAAAATcCAAAAATgCAAAAATkCAAAAAQE1AAAAIwIBNQAAACUCATVAAAAAAQE1QAAAAAEAAAAABRUABhYABxcACBgACRkACgAAAAAABRUABhYABxcACBgACRkACgECAQIDAQUGAQYHAQcIAQkKAQoMAgsNAwwPAQ0RAg4SBBETARIUARMVAhoYBRsZCw"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.sqlite.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.sqlite.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaBetterSqlite3({ url: connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/preorder/service.preorder.ts
var createPreOrderInDb = async (payload) => {
  const result = await prisma.preOrder.create({
    data: {
      name: payload.name,
      products: payload.products,
      preOrderWhen: payload.preorderWhen,
      startsAt: new Date(payload.startsAt),
      endsAt: payload.endsAt ? new Date(payload.endsAt) : null,
      status: payload.status
    }
  });
  return result;
};
var getPreOrderFromDb = async (query) => {
  const page = Number(query.page);
  const limit = Number(query.limit);
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy || "createdAt";
  const sortOrder = query.sortOrder || "desc";
  const whereCondition = {};
  if (query.filter === "Active") {
    whereCondition.status = "ACTIVE";
  } else if (query.filter === "Inactive") {
    whereCondition.status = "INACTIVE";
  }
  const result = await prisma.preOrder.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder
    }
  });
  const total = await prisma.preOrder.count({
    where: whereCondition
  });
  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    },
    data: result
  };
};
var getSinglePreOrderFromDb = async (id) => {
  const result = await prisma.preOrder.findUnique({
    where: { id }
  });
  return result;
};
var updateStatusinDb = async (id) => {
  const isExist = await prisma.preOrder.findUnique({
    where: { id }
  });
  if (!isExist) {
    throw {
      statusCode: 404,
      message: "PreOrder Is Not Found."
    };
  }
  const newStatus = isExist.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
  const updated = await prisma.preOrder.update({
    where: { id },
    data: {
      status: newStatus
    }
  });
  return updated;
};
var updatePreorderInDb = async (id, payload) => {
  const result = await prisma.preOrder.update({
    where: { id },
    data: {
      ...payload,
      startsAt: payload.startsAt ? new Date(payload.startsAt) : void 0,
      endsAt: payload.endsAt === null ? null : payload.endsAt ? new Date(payload.endsAt) : void 0
    }
  });
  return result;
};
var deleteOrderFromDb = async (id) => {
  const isExist = await prisma.preOrder.findUnique({
    where: { id }
  });
  if (!isExist) {
    throw {
      statusCode: 404,
      message: "PreOrder not found"
    };
  }
  const deleted = await prisma.preOrder.delete({
    where: { id }
  });
  return deleted;
};
var preorderServices = {
  createPreOrderInDb,
  getPreOrderFromDb,
  updateStatusinDb,
  deleteOrderFromDb,
  getSinglePreOrderFromDb,
  updatePreorderInDb
};

// src/modules/preorder/controller.preorder.ts
var createPreOrder = async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload, "this is payload");
    await preorderServices.createPreOrderInDb(payload);
    return sendResponse_default(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Pre Order Created Successfully"
    });
  } catch (error) {
    console.log(error, "error in create pre order controller");
    sendResponse_default(res, {
      statusCode: error.statusCode || 500,
      success: false,
      message: error.statusCode ? error.message : "Something went wrong!",
      error: error.message
    });
  }
};
var getAllPreOrder = async (req, res) => {
  try {
    const result = await preorderServices.getPreOrderFromDb(req.query);
    sendResponse_default(res, {
      statusCode: httpStatus.OK,
      message: "Data Retrived Successfully",
      success: true,
      data: result
    });
  } catch (error) {
    console.log(error, "error in get pre order controller");
    sendResponse_default(res, {
      statusCode: error.statusCode || 500,
      success: false,
      message: error.statusCode ? error.message : "Something went wrong!",
      error: error.message
    });
  }
};
var getSinglePreOrder = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "this is id");
    const result = await preorderServices.getSinglePreOrderFromDb(id);
    sendResponse_default(res, {
      statusCode: httpStatus.OK,
      message: "Data Retrived Successfully",
      success: true,
      data: result
    });
  } catch (error) {
    console.log(error, "error in get pre order controller");
    sendResponse_default(res, {
      statusCode: error.statusCode || 500,
      success: false,
      message: error.statusCode ? error.message : "Something went wrong!",
      error: error.message
    });
  }
};
var updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await preorderServices.updateStatusinDb(id);
    sendResponse_default(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "PreOrder status updated successfully",
      data: result
    });
  } catch (error) {
    console.log(error, "error in udpate controller");
    sendResponse_default(res, {
      statusCode: error.statusCode || 500,
      success: false,
      message: error.statusCode ? error.message : "Something went wrong!",
      error: error.message
    });
  }
};
var deletePreOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await preorderServices.deleteOrderFromDb(id);
    sendResponse_default(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "PreOrder deleted successfully",
      data: result
    });
  } catch (error) {
    console.log(error, "error in deletePreOrder controller");
    sendResponse_default(res, {
      statusCode: error.statusCode || 500,
      success: false,
      message: error.statusCode ? error.message : "Something went wrong!",
      error: error.message
    });
  }
};
var updatePreorder = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const result = await preorderServices.updatePreorderInDb(id, payload);
    sendResponse_default(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "PreOrder updated successfully",
      data: result
    });
  } catch (error) {
    console.log(error, "error in update controller");
    sendResponse_default(res, {
      statusCode: error.statusCode || 500,
      success: false,
      message: error.statusCode ? error.message : "Something went wrong!",
      error: error.message
    });
  }
};
var preOrderController = {
  createPreOrder,
  getAllPreOrder,
  updateStatus,
  deletePreOrder,
  getSinglePreOrder,
  updatePreorder
};

// src/modules/preorder/route.preorder.ts
var router = Router();
router.post("/create", preOrderController.createPreOrder);
router.get("/", preOrderController.getAllPreOrder);
router.get("/:id", preOrderController.getSinglePreOrder);
router.patch("/update-status/:id/status", preOrderController.updateStatus);
router.put("/update-preorder/:id", preOrderController.updatePreorder);
router.delete("/delete/:id", preOrderController.deletePreOrder);
var route_preorder_default = router;

// src/app.ts
var app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.get("/", async (req, res) => {
  res.send("Hello worlds, Pre order manager server is running");
});
app.use("/api/preorder", route_preorder_default);
var app_default = app;

// src/modules/config/index.ts
import dotenv from "dotenv";
import path2 from "path";
var envPath = path2.join(process.cwd(), ".env");
dotenv.config({
  path: envPath
});
var config_default = {
  databaseUrl: process.env.DATABASE_URL,
  port: process.env.PORT
};

// src/server.ts
var port = config_default.port;
var main = async () => {
  try {
    app_default.listen(port, () => {
      console.log(`Pre order manager server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error, "error in server ts file");
    process.exit(1);
  }
};
main();
//# sourceMappingURL=server.js.map