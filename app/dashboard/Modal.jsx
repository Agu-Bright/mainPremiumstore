import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { borderRadius } from "@mui/system";
import {
  Avatar,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import axios from "axios";
import { RestaurantContext } from "@context/RestaurantContext";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import CancelIcon from "@mui/icons-material/Cancel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};
const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

export default function BasicModal({
  open,
  handleClose,
  active,
  setState,
  setState2,
  type,
}) {
  // const { formatMoney } = React.useContext(RestaurantContext);
  const handleApprove = async (_id) => {
    try {
      const { data } = await axios.post("/api/deposit/update-deposit", {
        id: _id,
        approve: "true",
      });
      setState((prev) => !prev);
      handleClose();
    } catch (error) {
      console.log(error);
      handleClose();
    }
  };
  const handleApprove2 = async (_id) => {
    try {
      const { data } = await axios.post("/api/withdraw/update-withdraw", {
        id: _id,
        approve: "true",
      });
      console.log(data);
      setState2((prev) => !prev);
      handleClose();
    } catch (error) {
      console.log(error);
      handleClose();
    }
  };
  const handleDecline = async (_id) => {
    try {
      const { data } = await axios.post("/api/deposit/update-deposit", {
        id: _id,
        approve: "false",
      });
      console.log(data);
      setState((prev) => !prev);
      handleClose();
    } catch (error) {
      console.log(error);
      handleClose();
    }
  };
  const handleDecline2 = async (_id) => {
    try {
      const { data } = await axios.post("/api/withdraw/update-withdraw", {
        id: _id,
        approve: "false",
      });
      console.log(data);
      setState2((prev) => !prev);
      handleClose();
    } catch (error) {
      console.log(error);
      handleClose();
    }
  };

  //=======================================create category=================================//
  const [category, setCategory] = React.useState("");
  const { setToggle, catType, setCatType, formatMoney, logId } =
    React.useContext(RestaurantContext);

  const handleCreateCategory = async () => {
    if (!category) {
      toast.error("Category is required", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }
    try {
      const { data } = await axios.post("/api/logs/createCategory", {
        category,
      });
      setToggle((prev) => !prev);
      handleClose();
      setCategory("");
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  //=======================================CREAT LOG=================================//
  const [index, setIndex] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);
  const [social, setSocial] = React.useState("");
  const [description, setDesciption] = React.useState("");
  // const [username, setUsername] = React.useState("");
  const [log, setLog] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [logs, setLogs] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);
  const [curentLogs, setCurrentLogs] = React.useState([]);

  const [adddImage, setAddImage] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [customLog, setCustomLog] = React.useState("");

  const handleRemoveLog = (index) => {
    setLogs((prev) => {
      const data = prev.filter((_, i) => i !== index);
      console.log(data);
      return data;
    });
  };

  //=======================================delete category=================================//
  const [deleteIndex, setDeleteIndex] = React.useState(1);
  const [deleting, setDeleting] = React.useState(false);
  const handleDeleteCat = async (_catType) => {
    console.log("_catType");
    try {
      setDeleting(true);
      await axios.post("/api/logs/delete-category", {
        catId: _catType,
      });
      handleClose();
      setCatType("");
      setDeleting(false);
      setToggle((prev) => !prev);
      toast.error("Deleted", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      setDeleting(false);

      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const handleImageUpload = () => {
    const el = document.getElementById("screenshot");
    if (el) {
      el.click();
    }
  };

  const [csvContent, setCsvContent] = React.useState(null);
  csvContent && console.log(csvContent);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    // Check if the file is a CSV file
    if (file && file.type === "text/csv") {
      const reader = new FileReader();

      // Event listener to handle the file content once read
      reader.onload = (e) => {
        const content = e.target.result;

        let lines = content.split("\n"); // Split content into lines
        lines = lines.map((line) => line.replace("\r", "")); // Remove \r from each line
        let dataLines = lines.slice(1).filter((line) => line.trim() !== ""); // Remove header and filter out empty lines
        dataLines = dataLines.map((item) => {
          return {
            log: item,
          };
        });
        if (type === "add-log") {
          setCurrentLogs((prev) => {
            return [...prev, ...dataLines];
          });
        } else {
          setLogs((prev) => {
            return [...prev, ...dataLines];
          });
        }
      };

      reader.readAsText(file); // Read the file as text
    } else {
      toast.error("File upload must be a CSV", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  React.useEffect(() => {
    if (!open) {
      setIndex(0);
      setSocial("facebook");
      setDesciption("");
      setLog("");
      setLogs([]);
      setAddImage(false);
    }
  }, [open]);

  const handleUpload = async () => {
    try {
      setUploading(true);
      const uploadData = customLog
        ? { social: customLog, description, logs, price, catType, image }
        : {
            social,
            description,
            logs,
            price,
            catType,
          };

      const { data } = await axios.post("/api/logs/creatLog", uploadData);
      setIndex(0);
      handleClose();
      setToggle((prev) => !prev);
      setCustomLog("");
      setImage("");
      setUploading(false);
      setIndex(0);
      setSocial("facebook");
      setDesciption("");
      setLog("");
      setPrice("");
      setLogs([]);
    } catch (error) {
      setUploading(false);
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };
  //=======================================delete Log=================================//

  const handleDeleteLog = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/logs/delete-log", {
        logId: logId,
      });
      setLoading(false);
      toast.success("Deleted", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      handleClose();
      setToggle((prev) => !prev);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };
  const [logCategory, setLogCategory] = React.useState();
  logCategory && console.log("logCat", logCategory);
  React.useEffect(() => {
    if (type === "add-log" || type === "edit-log") {
      (async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(`/api/logs/admin/log/${logId}`);
          if (type === "edit-log") {
            setLogCategory(data?.logs);
          } else {
            setCurrentLogs(data?.logs?.logs);
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      })();
    }
  }, [type, logId]);

  const handleRemoveCurrentLog = (index) => {
    setCurrentLogs((prev) => {
      const data = prev.filter((_, i) => i !== index);
      return data;
    });
  };
  const [adding, setAdding] = React.useState(false);
  const handleUpdateLog = async () => {
    try {
      setAdding(true);
      await axios.post(`/api/logs/updatelog/${logId}`, { logs: curentLogs });
      toast.success("Update Successful", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setAdding(false);
      handleClose();
      setToggle((prev) => !prev);
    } catch (error) {
      setAdding(false);
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  //---------------------------------Edit Log--------------------------\

  const handleEditDetail = async () => {
    console.log("Edit detail");
    try {
      setAdding(true);
      await axios.post(`/api/logs/updatelog2/${logId}`, {
        ...logCategory,
      });
      toast.success("Update Successful", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setAdding(false);
      handleClose();
      setToggle((prev) => !prev);
    } catch (error) {
      setAdding(false);
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };
  if (type === "createCategory") {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create Category{" "}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 0.5 }}>
              Enter the category name that corresponds to the log you intend to
              create.
            </Typography>
            <div className="form-group" style={{ width: "100%" }}>
              <input
                type="text"
                name="category"
                className="input-text"
                placeholder="Category"
                style={{ width: "100%" }}
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              />
            </div>
            <Stack justifyContent="space-between" direction="row">
              <Button sx={{ color: "red", visibility: "hidden" }}></Button>
              <Button onClick={() => handleCreateCategory()}>Create</Button>
            </Stack>
          </Box>
        </Modal>
      </div>
    );
  } else if (type === "createLog") {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create Log{" "}
            </Typography>
            <Divider />
            {index === 0 && (
              <Typography id="modal-modal-description" sx={{ mt: 0.5 }}>
                Choose the social Account Type
              </Typography>
            )}
            {index === 1 && (
              <Typography id="modal-modal-description" sx={{ mt: 0.5 }}>
                Log Description{" "}
              </Typography>
            )}
            {index === 0 && (
              <Stack spacing={2} sx={{ marginTop: "10px" }}>
                <>
                  {!adddImage ? (
                    <>
                      <Paper
                        onClick={() => setSocial("facebook")}
                        sx={{
                          padding: "15px 10px",
                          cursor: "pointer",
                          display: "flex",
                          padding: "2px",
                          background: `${
                            social === "facebook"
                              ? "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)"
                              : "white"
                          }`,
                        }}
                      >
                        <Box
                          sx={{
                            border: "2px solid white",
                            padding: "10px",
                            width: "100%",
                            borderRadius: "5px",
                            display: "flex",
                          }}
                        >
                          <Box sx={{ width: "20%" }}>
                            <Avatar
                              src="/img/facebook.png"
                              sx={{ borderRadius: "2px" }}
                            />
                          </Box>
                          <Typography
                            sx={{
                              width: "75%",
                              color: `${
                                social === "facebook" ? "white" : "black"
                              }`,
                              fontWeight: "800",
                              fontSize: "1.5em",
                            }}
                          >
                            Facebook
                          </Typography>
                        </Box>
                      </Paper>
                      {/* facebook */}
                      <Paper
                        onClick={() => setSocial("instagram")}
                        sx={{
                          padding: "15px 10px",
                          cursor: "pointer",
                          display: "flex",
                          padding: "2px",
                          background: `${
                            social === "instagram"
                              ? "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)"
                              : "white"
                          }`,
                        }}
                      >
                        <Box
                          sx={{
                            border: "2px solid white",
                            padding: "10px",
                            width: "100%",
                            borderRadius: "5px",
                            display: "flex",
                          }}
                        >
                          <Box sx={{ width: "20%" }}>
                            <Avatar
                              src="/img/instagram.png"
                              sx={{ borderRadius: "2px" }}
                            />
                          </Box>
                          <Typography
                            sx={{
                              width: "75%",
                              color: `${
                                social === "instagram" ? "white" : "black"
                              }`,
                              fontWeight: "800",
                              fontSize: "1.5em",
                            }}
                          >
                            Instagram
                          </Typography>
                        </Box>
                      </Paper>
                      {/* twittter */}
                      <Paper
                        onClick={() => setSocial("twitter")}
                        sx={{
                          padding: "15px 10px",
                          cursor: "pointer",
                          display: "flex",
                          padding: "2px",
                          background: `${
                            social === "twitter"
                              ? "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)"
                              : "white"
                          }`,
                        }}
                      >
                        <Box
                          sx={{
                            border: "2px solid white",
                            padding: "10px",
                            width: "100%",
                            borderRadius: "5px",
                            display: "flex",
                          }}
                        >
                          <Box sx={{ width: "20%" }}>
                            <Avatar
                              src="/img/twitter.png"
                              sx={{ borderRadius: "2px" }}
                            />
                          </Box>
                          <Typography
                            sx={{
                              width: "75%",
                              color: `${
                                social === "twitter" ? "white" : "black"
                              }`,
                              fontWeight: "800",
                              fontSize: "1.5em",
                            }}
                          >
                            Twitter
                          </Typography>
                        </Box>
                      </Paper>
                      <Paper
                        onClick={() => setSocial("gmail")}
                        sx={{
                          padding: "15px 10px",
                          cursor: "pointer",
                          display: "flex",
                          padding: "2px",
                          background: `${
                            social === "gmail"
                              ? "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)"
                              : "white"
                          }`,
                        }}
                      >
                        <Box
                          sx={{
                            border: "2px solid white",
                            padding: "10px",
                            width: "100%",
                            borderRadius: "5px",
                            display: "flex",
                          }}
                        >
                          <Box sx={{ width: "20%" }}>
                            <Avatar
                              src="/img/gmail.png"
                              sx={{ borderRadius: "2px" }}
                            />
                          </Box>
                          <Typography
                            sx={{
                              width: "75%",
                              color: `${
                                social === "gmail" ? "white" : "black"
                              }`,
                              fontWeight: "800",
                              fontSize: "1.5em",
                            }}
                          >
                            Gmail
                          </Typography>
                        </Box>
                      </Paper>
                      <Paper
                        onClick={() => setSocial("tiktok")}
                        sx={{
                          padding: "15px 10px",
                          cursor: "pointer",
                          display: "flex",
                          padding: "2px",
                          background: `${
                            social === "tiktok"
                              ? "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)"
                              : "white"
                          }`,
                        }}
                      >
                        <Box
                          sx={{
                            border: "2px solid white",
                            padding: "10px",
                            width: "100%",
                            borderRadius: "5px",
                            display: "flex",
                          }}
                        >
                          <Box sx={{ width: "20%" }}>
                            <Avatar
                              src="/img/tiktok.png"
                              sx={{ borderRadius: "2px" }}
                            />
                          </Box>
                          <Typography
                            sx={{
                              width: "75%",
                              color: `${
                                social === "tiktok" ? "white" : "black"
                              }`,
                              fontWeight: "800",
                              fontSize: "1.5em",
                            }}
                          >
                            Tiktok
                          </Typography>
                        </Box>
                      </Paper>
                      <Paper
                        // onClick={() => setSocial("others")}
                        sx={{
                          padding: "15px 10px",
                          cursor: "pointer",
                          display: "flex",
                          padding: "2px",
                          background: `${
                            social === "others"
                              ? "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)"
                              : "white"
                          }`,
                        }}
                      >
                        <Box
                          sx={{
                            border: "2px solid white",
                            padding: "10px",
                            width: "100%",
                            borderRadius: "5px",
                            display: "flex",
                          }}
                        >
                          <Box sx={{ width: "20%" }}>
                            <Avatar
                              src="/img/others.png"
                              sx={{ borderRadius: "2px" }}
                            />
                          </Box>
                          <Typography
                            onClick={() => setAddImage(true)}
                            sx={{
                              width: "75%",
                              color: `${
                                social === "others" ? "white" : "black"
                              }`,
                              fontWeight: "800",
                              fontSize: "1.5em",
                            }}
                          >
                            Add Custom
                          </Typography>
                        </Box>
                      </Paper>
                    </>
                  ) : (
                    <>
                      <div>addImage</div>
                      {image && (
                        <>
                          <Avatar
                            src={image}
                            alt="screendhot"
                            sx={{
                              width: "100px",
                              height: "100px",
                              borderRadius: "5px",
                            }}
                          />
                          <div className="form-group" style={{ width: "100%" }}>
                            <input
                              type="text"
                              name="log"
                              className="input-text"
                              placeholder="Log Name eg. Twitter"
                              style={{ width: "100%" }}
                              onChange={(e) => setCustomLog(e.target.value)}
                              value={customLog}
                            />
                          </div>
                        </>
                      )}

                      <button
                        onClick={() => handleImageUpload()}
                        className="btn-md  btn-block"
                        style={{
                          marginTop: "20px",
                          border: "none",
                          color: "white",
                          fontWeight: "800",
                          borderRadius: "10px",
                          fontSize: "1.2em",
                          background:
                            "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)",
                        }}
                      >
                        {loading ? (
                          <CircularProgress size={20} sx={{ color: "white" }} />
                        ) : (
                          "Upload Log Image"
                        )}
                      </button>
                    </>
                  )}
                  <input
                    type="file"
                    id="screenshot"
                    style={{ display: "none" }}
                    onChange={async (e) => {
                      const file = e.target?.files;
                      if (file) {
                        try {
                          setLoading(true);
                          const { data } = await axios.post(
                            "/api/cloudinaryupload/profile",
                            file
                          );
                          setImage(data?.photosArray[0].url);
                          setLoading(false);
                        } catch (error) {
                          setLoading(false);
                          toast.error("Unable to upload", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            transition: Bounce,
                          });
                        }
                      }

                      // setImage()
                    }}
                  />
                </>
              </Stack>
            )}
            {index === 1 && (
              <div className="form-group" style={{ width: "100%" }}>
                <input
                  type="text"
                  name="log"
                  className="input-text"
                  placeholder="Aged Facebook | 0-5 friends"
                  style={{ width: "100%" }}
                  onChange={(e) => setDesciption(e.target.value)}
                  value={description}
                />
                <input
                  type="number"
                  name="log"
                  className="input-text"
                  placeholder="Price"
                  style={{ width: "100%", marginTop: "10px" }}
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>
            )}
            {index === 2 && (
              <div>
                <div>
                  <span style={{ fontWeight: "800" }}>Uploaded Logs:</span>
                  {logs?.length}
                </div>
                <div
                  style={{
                    border: `${
                      logs && logs.length > 0 ? "0.1px solid gray" : "none"
                    }`,
                    maxHeight: "200px",
                    overflow: "scroll",
                  }}
                >
                  {logs &&
                    logs.length > 0 &&
                    logs.map((log, index) => (
                      <div
                        key={index}
                        style={{
                          position: "relative",
                          border: "0.1px solid gray",
                          margin: "10px",
                          borderRadius: "5px",
                          padding: "5px",
                        }}
                      >
                        <IconButton
                          onClick={() => handleRemoveLog(index)}
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                          }}
                        >
                          <CancelIcon sx={{ color: "red" }} />
                        </IconButton>
                        <div>
                          details: <span>{log.log}</span>{" "}
                        </div>
                      </div>
                    ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <button
                    style={{ border: "none" }}
                    onClick={() => {
                      const el = document.getElementById("csvfile");
                      if (el) {
                        el.click();
                      }
                    }}
                  >
                    Add Csv file
                  </button>

                  <input
                    type="file"
                    id="csvfile"
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                  />

                  <div>------------------OR--------------------</div>
                  <div className="form-group" style={{ width: "100%" }}>
                    <input
                      type="text"
                      name="log"
                      className="input-text"
                      placeholder="@username,password,email,password..."
                      style={{ width: "100%", marginTop: "5px" }}
                      onChange={(e) => setLog(e.target.value)}
                      value={log}
                    />
                  </div>
                  {log && (
                    <button
                      onClick={() => {
                        setLogs((prev) => {
                          return [...prev, { log: log }];
                        });
                        setLog("");
                        toast.success("Success, You can add more", {
                          position: "top-center",
                          autoClose: 5000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "dark",
                          transition: Bounce,
                        });
                      }}
                      style={{
                        width: "20%",
                        border: "none",
                        borderRadius: "5px",
                        background: "rgba(128,117,255,1) 0%",
                        color: "white",
                        cursor: "pointer",
                        padding: "10px 0px",
                      }}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            )}

            <Stack
              justifyContent="space-between"
              direction="row"
              sx={{ marginTop: "10px" }}
            >
              <Button
                onClick={() => {
                  setIndex((prev) => prev - 1);
                }}
                sx={{
                  color: "red",
                  visibility: `${index === 0 ? "hidden" : "visible"}`,
                }}
              >
                Previous
              </Button>
              {!uploading && (
                <Button
                  onClick={() => {
                    if (index === 1) {
                      if (!description) {
                        toast.error("Description is required", {
                          position: "top-center",
                          autoClose: 5000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "dark",
                          transition: Bounce,
                        });
                        return;
                      }
                      setIndex((prev) => prev + 1);
                    } else if (index === 2) {
                      if (logs.length === 0) {
                        toast.error("Add at least one log to upload", {
                          position: "top-center",
                          autoClose: 5000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "dark",
                          transition: Bounce,
                        });
                        return;
                      }
                      handleUpload();
                    } else setIndex((prev) => prev + 1);
                  }}
                >
                  {`${index === 2 ? "Upload" : "Continue"}`}
                </Button>
              )}
              {uploading && (
                <Button>
                  <CircularProgress
                    size={20}
                    sx={{ color: "rgba(128,117,255,1) 0%" }}
                  />
                </Button>
              )}
            </Stack>
          </Box>
        </Modal>
      </div>
    );
  }
  if (type === "delete-category") {
    return (
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {deleteIndex === 1 && (
              <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Delete Category{" "}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 1, fontWeight: "700" }}
                >
                  Are you sure you want to Delete this category?
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 1, fontWeight: "300" }}
                >
                  Deleting this category will clear all the logs under this
                  category and user interactions with them{" "}
                </Typography>
                <Stack justifyContent="space-between" direction="row">
                  <Button sx={{ color: "red" }} onClick={() => handleClose()}>
                    Cancel
                  </Button>
                  <Button onClick={() => setDeleteIndex(2)}>Delete</Button>
                </Stack>
              </>
            )}
            {deleteIndex === 2 && (
              <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Delete Category{" "}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 1, fontWeight: "700" }}
                >
                  You really want to do this Boss !!{" "}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 1, fontWeight: "300" }}
                >
                  😲
                </Typography>
                <Stack justifyContent="space-between" direction="row">
                  <Button sx={{ color: "red" }} onClick={() => handleClose()}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleDeleteCat(catType)}>
                    Delete
                  </Button>
                </Stack>
              </>
            )}
          </Box>
        </Modal>
      </div>
    );
  }
  if (type === "delete-log") {
    return (
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Delete Log{" "}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              Are you sure you want to delete this log
            </Typography>
            <Stack justifyContent="space-between" direction="row">
              <Button sx={{ color: "red" }} onClick={() => handleClose()}>
                Cancel
              </Button>
              <Button onClick={() => handleDeleteLog()}>
                {loading ? (
                  <CircularProgress sx={{ color: "blue" }} size={20} />
                ) : (
                  "Delete"
                )}
              </Button>
            </Stack>
          </Box>
        </Modal>
      </div>
    );
  }
  if (type === "add-log") {
    return (
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Logs
            </Typography>
            <div>
              <div>
                <span style={{ fontWeight: "800" }}>Uploaded Logs:</span>
                {curentLogs?.length}
              </div>
              <div
                style={{
                  border: `${
                    logs && logs.length > 0 ? "0.1px solid gray" : "none"
                  }`,
                  maxHeight: "200px",
                  overflow: "scroll",
                }}
              >
                {loading && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress sx={{ color: "blue" }} size={20} />
                  </div>
                )}
                {curentLogs &&
                  !loading &&
                  curentLogs.length > 0 &&
                  curentLogs.map((log, index) => (
                    <div
                      key={index}
                      style={{
                        position: "relative",
                        border: "0.1px solid gray",
                        margin: "10px",
                        borderRadius: "5px",
                        padding: "5px",
                      }}
                    >
                      <IconButton
                        onClick={() => handleRemoveCurrentLog(index)}
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                        }}
                      >
                        <CancelIcon sx={{ color: "red" }} />
                      </IconButton>
                      <div>
                        details: <span>{log.log}</span>{" "}
                      </div>
                    </div>
                  ))}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                <button
                  style={{ border: "none" }}
                  onClick={() => {
                    const el = document.getElementById("csvfile");
                    if (el) {
                      el.click();
                    }
                  }}
                >
                  Add Csv file
                </button>

                <input
                  type="file"
                  id="csvfile"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />

                <div>------------------OR--------------------</div>
                <div className="form-group" style={{ width: "100%" }}>
                  <input
                    type="text"
                    name="log"
                    className="input-text"
                    placeholder="@username,password,email,password..."
                    style={{ width: "100%", marginTop: "5px" }}
                    onChange={(e) => setLog(e.target.value)}
                    value={log}
                  />
                </div>
                {log && (
                  <button
                    onClick={() => {
                      setCurrentLogs((prev) => {
                        return [...prev, { log: log }];
                      });
                      setLog("");
                      toast.success("Success, You can add more", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                      });
                    }}
                    style={{
                      width: "20%",
                      border: "none",
                      borderRadius: "5px",
                      background: "rgba(128,117,255,1) 0%",
                      color: "white",
                      cursor: "pointer",
                      padding: "10px 0px",
                    }}
                  >
                    Add
                  </button>
                )}
              </div>
            </div>

            <Stack justifyContent="space-between" direction="row">
              <Button sx={{ color: "red" }} onClick={() => handleClose()}>
                Cancel
              </Button>
              <Button onClick={() => handleUpdateLog()}>
                {adding ? (
                  <CircularProgress sx={{ color: "blue" }} size={20} />
                ) : (
                  "Update"
                )}
              </Button>
            </Stack>
          </Box>
        </Modal>
      </div>
    );
  } else if (type === "edit-log") {
    return (
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Log{" "}
            </Typography>
            <Box>
              {logCategory && (
                <>
                  <div className="form-group" style={{ width: "100%" }}>
                    <input
                      type="number"
                      name="log"
                      className="input-text"
                      placeholder=""
                      style={{ width: "100%", marginTop: "5px" }}
                      onChange={(e) =>
                        setLogCategory((prev) => {
                          return { ...prev, price: e.target.value };
                        })
                      }
                      value={logCategory?.price}
                    />
                  </div>
                  <div className="form-group" style={{ width: "100%" }}>
                    <input
                      type="text"
                      name="log"
                      className="input-text"
                      placeholder=""
                      style={{ width: "100%", marginTop: "5px" }}
                      onChange={(e) =>
                        setLogCategory((prev) => {
                          return { ...prev, description: e.target.value };
                        })
                      }
                      value={logCategory?.description}
                    />
                  </div>
                </>
              )}
            </Box>
            <Stack justifyContent="space-between" direction="row">
              <Button sx={{ color: "red" }} onClick={() => handleClose()}>
                cancel
              </Button>
              {!adding && (
                <Button onClick={() => handleEditDetail()}>Update</Button>
              )}{" "}
              {adding && (
                <Button>
                  <CircularProgress sx={{ color: "blue" }} size={15} />
                </Button>
              )}{" "}
            </Stack>
          </Box>
        </Modal>
      </div>
    );
  } else
    return (
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {active?.transactionHash || active?.screenShot ? (
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Credit Account{" "}
              </Typography>
            ) : (
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Confirm Withdrawal{" "}
              </Typography>
            )}
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to credit{" "}
              <span style={{ fontWeight: "750" }}>
                {active?.user?.username}
              </span>{" "}
              with the sum of ₦
              <span style={{ fontWeight: "750" }}>
                {formatMoney(Number(active?.amount))}
              </span>
            </Typography>
            <Stack justifyContent="space-between" direction="row">
              <Button
                sx={{ color: "red" }}
                onClick={() =>
                  active?.transactionHash || active?.screenShot
                    ? handleDecline(active?._id)
                    : handleDecline2(active?._id)
                }
              >
                Decline
              </Button>
              <Button
                onClick={() =>
                  active?.transactionHash || active?.screenShot
                    ? handleApprove(active?._id)
                    : handleApprove2(active?._id)
                }
              >
                Approve
              </Button>
            </Stack>
          </Box>
        </Modal>
      </div>
    );
}
