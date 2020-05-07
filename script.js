const App = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      query: "",
      response: null, 
      photos: null,
      selected_photo: null,
      is_selected: false,
      meme_text: "",
    },
    methods: {
        search_call() {
            /*Key: e0019bee21d189d5402906185b8837a1
              Secret: a877828bd6cd0862 */

            this.is_selected = false;
            
              axios
                .get("https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e0019bee21d189d5402906185b8837a1&format=json&per_page=50&text=" + this.query)
                .then(response => {
                    let str = response.data;

                    //save json part of the response
                    str = str.substr(0, str.length - 1);
                    this.response = JSON.parse(str.substr(14));
                    this.photos = this.response.photos.photo;
                })
        },

        get_img_url(photo) {
            //returns url for photo according to flickr api: https://www.flickr.com/services/api/misc.urls.html
            return "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_q.jpg";
        },

        get_full_img_url(photo) {
             //returns url for photo according to flickr api: https://www.flickr.com/services/api/misc.urls.html
             return "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_n.jpg";
        },

        photo_click(photo) {
            //displays photo and option to add text
            this.meme_text = "";
            this.selected_photo = photo;
            this.is_selected = true;
        },

        home_click() {
            this.is_selected = false;

            //reset query
            this.query = "";
            this.photos = null;
        },

        save_photo(){
            //saves photo of meme using html2canvas: https://html2canvas.hertzen.com/
            html2canvas(document.getElementById('meme'), {useCORS: true}).then(function(canvas) {
                // Export the canvas to its data URI representation
                var base64image = canvas.toDataURL("image/png");
                
                //downloads image as png
                var link = document.createElement('a');  
                link.href = base64image; link.download = 'image.png';
                document.body.appendChild(link);
                link.click();
            });
        }
    }
  })