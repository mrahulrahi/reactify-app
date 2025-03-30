export const formatLocationName = (locationName) => {
   if (typeof locationName !== "string" || locationName.trim() === "") {
      // Return an empty string or handle the case appropriately based on your requirements
      return "";
   }

   const words = locationName.split(" ");

   if (words.length === 1) {
      // If there's only one word, capitalize the first letter and make the rest lowercase
      return words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
   } else {
      // If there are multiple words, capitalize the first letter of each word and make the rest lowercase
      const capitalizedWords = words.map(
         (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      );
      return capitalizedWords.join(" ");
   }
};


export function convertToTitleCase(str) {
   return str.charAt(0) + str.slice(1).toLowerCase();
}

export async function disableBackButton() {
   window.history.pushState(null, '', window.location.href);
   window.onpopstate = function () {
      window.history.pushState(null, '', window.location.href);
   }
}


export function fixUrl(url) {
   // Check if the URL starts with http://, https://, or www.
   if (!/^https?:\/\//i.test(url)) {
      // Check if the URL starts with www. but doesn't have http:// or https://
      if (/^www\./i.test(url)) {
         // Prepend https:// to the URL if it starts with www. but doesn't have http:// or https://
         url = "https://" + url;
      } else {
         // Otherwise, prepend http:// to the URL
         url = "http://" + url;
      }
   }
   return url;
}