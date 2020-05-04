const App = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      query: "",
      response: null, 
      photos: null,
    },
    methods: {
        search_call() {
            /*Key: e0019bee21d189d5402906185b8837a1
              Secret: a877828bd6cd0862 */

            axios
                .get("https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e0019bee21d189d5402906185b8837a1&format=json&per_page=5&text=" + this.query)
                .then(response => {
                    let str = response.data;

                    //save json part of the response
                    str = str.substr(0, str.length - 1);
                    this.response = JSON.parse(str.substr(14));
                    this.photos = this.response.photos.photo;
                    console.log(this.photos);
                })
        },

        get_img_url(photo) {
            return "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_n.jpg";
        }
    }
  })