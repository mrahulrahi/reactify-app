export const getImageSize = (file) => {
   return new Promise((resolve, reject) => {
      if (!file) {
         reject("No file provided");
      }

      const reader = new FileReader();
      reader.onload = function (e) {
         const img = new Image();
         img.onload = function () {
            const { width, height } = this;
            if (width === 1200 && height === 900) {
               resolve(true);
            } else {
               resolve(false);
            }
         };
         img.src = e.target.result;
      };

      reader.readAsDataURL(file);
   });
};
