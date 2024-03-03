import multer from "multer";

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ruta donde se guardarán los archivos subidos
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    // Nombre del archivo en el servidor
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Opciones de Multer
export const upload = multer({ storage: storage });
