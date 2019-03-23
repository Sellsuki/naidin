<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <div class="container">
      <h1>Book Store : Harry Potter</h1>
    </div>



    <div class="container">
      <button type="button" class="btn btn-success cart" data-toggle="modal" data-target="#cart">CART</button>
      <div class="">
        <div class="modal fade" id="cart" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Cart</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="container">
                  <!--type book : {{ typebookcount }}-->

                  <div class="" v-for="(item, index) in items" :key="index">
                    <div class="card" v-if="item.bookcart > 0">
                      <div class="row">
                        <div class="col-6 no-gutter">
                          <img class="book_img" :src="item.img" alt="">
                        </div>
                        <div class="col-6 no-gutter">
                          <div>Book ID :  {{item.id}}</div>
                          <div>bookname : {{ item.name }}</div>
                          <div>number : {{ item.bookcart }}</div>
                          <button type="button" class="btn btn-secondary" @click="removeCart(item.id-1)">Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>total book : {{ totalbook }}</div>
                  <div>total price : {{ totalprice }}</div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <!--<button type="button" class="btn btn-primary">Save changes</button>-->
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 card" v-for="(item, index) in items" :key="index">
            <h5>{{ item.name }}</h5>
            <img class="book_img" :src="item.img" alt="">
            {{ item.msg }}
            {{ item.id }}
            <input class="form-control" type="number" v-model.number="item.bookcount">
            <button type="button" class="btn btn-success" @click="addCart(item.id-1)">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      items: [{
        name: 'Harry Potter1',
        img: 'https://via.placeholder.com/200x200.png?text=HP1',
        msg: 'Harry Potter',
        price: 10,
        id: '1',
        bookcount: 1,
        bookcart: 0,
        incart: 0
      },{
        name: 'Harry Potter2',
        img: 'https://via.placeholder.com/200x200.png?text=HP2',
        msg: 'Harry Potter',
        price: 20,
        id: '2',
        bookcount: 1,
        bookcart:0,
        incart: 0
      },{
        name: 'Harry Potter3',
        img: 'https://via.placeholder.com/200x200.png?text=HP3',
        msg: 'Harry Potter',
        price: 30,
        id: '3',
        bookcount: 1,
        bookcart:0,
        incart: 0
      },{
        name: 'Harry Potter4',
        img: 'https://via.placeholder.com/200x200.png?text=HP4',
        msg: 'Harry Potter',
        price: 40,
        id: '4',
        bookcount: 1,
        bookcart:0,
        incart: 0
      },{
        name: 'Harry Potter5',
        img: 'https://via.placeholder.com/200x200.png?text=HP5',
        msg: 'Harry Potter',
        price: 50,
        id: '5',
        bookcount: 1,
        bookcart:0,
        incart: 0
      },{
        name: 'Harry Potter6',
        img: 'https://via.placeholder.com/200x200.png?text=HP6',
        msg: 'Harry Potter',
        price: 60,
        id: '6',
        bookcount: 1,
        bookcart:0,
        incart: 0
      },{
        name: 'Harry Potter7',
        img: 'https://via.placeholder.com/200x200.png?text=HP7',
        msg: 'Harry Potter',
        price: 70,
        id: '7',
        bookcount: 1,
        bookcart:0,
        incart: 0
      }],
      totalprice: 0,
      totalbook: 0,
      typebookcount: 0,
      typestore: ' '
    }
  },
  methods: {
    addCart(bookid) {
      this.items[bookid].bookcart += this.items[bookid].bookcount;
      if(this.items[bookid].bookcart > 0){
        this.items[bookid].incart = 1;
      }
      this.totalbook += this.items[bookid].bookcount;
      // this.totalprice += this.items[bookid].price * this.items[bookid].bookcount;
      this.calculateprice();
    },
    calculateprice(){
      this.typebookcount = 0;
      this.totalprice = 0;
      var discount = 0;
      var price = 0;
      var pricebf = 0;

      for(let i =0 ; i < this.items.length ; i++){
        if(this.items[i].bookcart > 0){
          this.typebookcount += 1;
          pricebf += this.items[i].price;
          price += ((this.items[i].bookcart-1) * (this.items[i].price));

          discount = 1 - ((this.typebookcount-1) * 0.1);

          this.totalprice = (pricebf*discount) + price;
        }
      }
    },
    removeCart(bookid) {
      this.totalbook -= this.items[bookid].bookcart;
      this.typebookcount -= 1;
      this.items[bookid].bookcart = 0;
      this.items[bookid].incart = 0;
      this.calculateprice();
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.book_img {
  height: 100%;
  width: 100%;
}

.row.card {
  padding-left: 0;
  padding-right: 0;
  padding-top: 15px;
  padding-bottom: 15px;
}

.card {
  /*padding: 0px 30px;*/
  padding-bottom: 15px;
  padding-top: 15px;
}

.cart {
  width: 15%;
  position: relative;
  left: 44%;
  margin: 30px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
