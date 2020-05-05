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
            this.selected_photo = photo;
            this.is_selected = true;
        },

        home_click() {
            this.is_selected = false;

            //reset query
            this.query = "";
            this.photos = null;
        }
    }
  })