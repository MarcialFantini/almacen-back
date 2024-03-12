import multer from "multer";

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ruta donde se guardarán los archivos subidos
    console.log(file);
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    // Nombre del archivo en el servidor
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Opciones de Multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // límite de tamaño de archivo (10MB)
  },
  fileFilter: function (req, file, cb) {
    // Filtro para permitir solo ciertos tipos de archivo
    const allowedTypes = ["image/jpeg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Tipo de archivo no válido. Solo se permiten archivos JPEG y PNG."
        )
      );
    }
  },
});

export { upload };
