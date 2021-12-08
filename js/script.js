// ------------------------------------add users-------------//

function signup() {

    // Recuperation des données
    var firstName = document.getElementById('firstName').value;
    var verifFirstName = verifLength(firstName,3);

    if (verifFirstName) {
        document.getElementById("firstNameError").innerHTML = "";

    } else {
        
        document.getElementById("firstNameError").innerHTML = "First name must have at least 3 characters";
        document.getElementById('firstNameError').style.color = "red";

    }

    var lastName = document.getElementById('lastName').value;

    var verifLastName = verifLength(lastName,5);

    if (verifLastName) {
        document.getElementById("lastNameError").innerHTML = "";

    } else {
        
        document.getElementById("lastNameError").innerHTML = "Last name must have at least 5 characters";
        document.getElementById('lastNameError').style.color = "red";
    }

    var email = document.getElementById('email').value;
    var verifEmail = validateEmail(email);
    if (verifEmail) {
        document.getElementById("emailError").innerHTML = "";

    } else {
        
        document.getElementById("emailError").innerHTML = "Invalid Email";
        document.getElementById('emailError').style.color = "red";
    }
    var emailExist = userExist(email);
    if (!emailExist) {
        document.getElementById("emailExistError").innerHTML = "";

    } else {
        
        document.getElementById("emailExistError").innerHTML = "Email already exist";
        document.getElementById('emailExistError').style.color = "red";
    }

    var password = document.getElementById('password').value;
    var verifPassword = verifLength(password,8);
    console.log(verifPassword);

    if (verifPassword) {
        document.getElementById("passwordError").innerHTML = "";

    } else {
        
        document.getElementById("passwordError").innerHTML = "Password must have at least 8 characters";
        document.getElementById('passwordError').style.color = "red";

    }

    var confirmPwd = document.getElementById('confirmPwd').value;
    if (confirmPwd == password) {
        document.getElementById("confirmPasswordError").innerHTML = "";

    } else {
        document.getElementById("confirmPasswordError").innerHTML = "Invalid confirmation";
        document.getElementById("confirmPasswordError").style.color="red";
    }
    var tel = document.getElementById('tel').value;
    if ((tel.length == 8 )&&(isNaN(tel)==false)) {
        document.getElementById("telError").innerHTML = "";

    } else {
        document.getElementById("telError").innerHTML = "Invalid tel";
        document.getElementById("telError").style.color = "red";
    }

    if (verifFirstName && verifLastName && verifEmail && verifPassword && (confirmPwd == password) &&  (tel.length == 8 ) && (isNaN(tel)==false) && (!emailExist)) {
        // Regroupement des valeurs 
        
        var idUser = JSON.parse(localStorage.getItem("idUser") || "10");
    
        var user = {
        id : idUser,
        firstName : firstName,
        lastName : lastName,
        email: email,
        password : password,
        confirmPwd : confirmPwd,
        tel : tel,
        role :  "client"
    };

    // Récupération des anciennes valeurs dans LS
    var usersTab = JSON.parse(localStorage.getItem("users") || "[]") ;
    // Ajout de l'objet user dans le tableau usersTab
    usersTab.push(user);
    // Sauvegarde du tableau usersTab (mis à jour)
    localStorage.setItem("users",JSON.stringify(usersTab));
    localStorage.setItem("idUser" , idUser + 1);
    location.reload();
    }
}

function verifLength(ch,nb) {
    return ch.length >= nb ;
}

function validateEmail(email) {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(email).toLowerCase());
  }

function validateOnlyTextField(element) {
    var str = element.value;
    if(!(/^[a-zA-Z, ]+$/.test(str))){
        // console.log('String contain number characters');
        str = str.substr(0,  str.length -100);
        element.value = str;
    }
}

function userExist(email) {
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var exist = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            exist = true;
        }
    }

    return exist;
}
//---------------------------displaying users in dashboard--------------//

function displayUsers() {
  var users = JSON.parse(localStorage.getItem("users") || "[]");
  var usersTable = `
  <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Id</th>
                          <th scope="col">First Name</th>
                          <th scope="col">Last Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Tel</th>
                          <th scope="col">Role</th>
                          <th scope="col">Actions</th>

                        </tr>
                      </thead>
                      <tbody>`;

  for (let i = 0; i < users.length; i++) {

      usersTable = usersTable  + `
      <tr>
                          <th scope="row">${users[i].id}</th>
                          <td>${users[i].firstName}</td>
                          <td>${users[i].lastName}</td>
                          <td>${users[i].email}</td>
                          <td>${users[i].tel}</td>
                          <td>${users[i].role}</td>
                          <td>
                              <button type="button" class="btn btn-success" onclick="editUser(${users[i].id})">Update</button>
                              <button type="button" class="btn btn-danger" onclick="deleteObject(${i},'users')">Delete</button>

                          </td>

      </tr>
      `;


  }

  usersTable = usersTable + `
  </tbody>
  </table>`;


  document.getElementById("usersTable").innerHTML =  usersTable;
}
//-----------------------------------------------------delete modify users------------------------//
function editUser(id) {
  // alert("test");
  var user = searchById(id,"users");
  console.log(user);
  var editUser= `
  <div class="col-md-12 form-group">
  <input type="password" class="form-control" id="newPassword" name="name" placeholder="Password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'" value=${user.password}>
  <span id="passwordError"></span>
  </div>
  <div class="col-md-12 form-group">
  <input type="tel" class="form-control" id="newTel" name="name" placeholder="Tel" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Tel'" value=${user.tel}>
  <span id="telError"></span>

  </div>
  <div class="col-md-12 form-group">
  <button type="submit" value="submit" class="btn btn-warning" onclick="validateEditUser(${user.id})">Validate</button>
  </div>

  `;
  
  document.getElementById("editUser").innerHTML = editUser;

}

function searchById(id,clé) {
  var Tab = JSON.parse(localStorage.getItem(clé) || "[]");

  for (let i = 0; i < Tab.length; i++) {
      if (Tab[i].id == id ) {
          return Tab[i];
      }        
  }
}

function validateEditUser(id) {
  // Recupération des nouvelles valeurs

  var newPassword = document.getElementById('newPassword').value;
  var verifPassword = verifLength(newPassword,8);
console.log(newPassword);

  if (verifPassword) {
      document.getElementById("passwordError").innerHTML = "";

  } else {
      
      document.getElementById("passwordError").innerHTML = "Password must have at least 8 characters";
      document.getElementById('passwordError').style.color = "red";

  }
  var newTel = document.getElementById('newTel').value;
  if ((newTel.length == 8 )&&(isNaN(newTel)==false)) {
      document.getElementById("telError").innerHTML = "";

  } else {
      document.getElementById("telError").innerHTML = "Invalid tel";
      document.getElementById("telError").style.color = "red";
  }

  if (verifPassword && (newTel.length == 8 )&&(isNaN(newTel)==false)) {
  // Récupération des utilisateurs dans LS
  var users = JSON.parse(localStorage.getItem("users") || '[]');
  // Parcours tab, recherche user à modifier et modifications du password et tel
  for (let i = 0; i < users.length; i++) {
      if (users[i].id == id) {
          users[i].password = newPassword;
          users[i].tel = newTel;

      }
      
  }
  // Sauvegarde du mise à jour
  localStorage.setItem("users",JSON.stringify(users));
  // refresh de la page
  location.reload();

  }

 
}

function deleteUser(position) {
  var users = JSON.parse(localStorage.getItem("users") || "[]");

  users.splice(position,1);

  localStorage.setItem("users", JSON.stringify(users));

  location.reload();
}

function deleteObject(position,clé) {
  var Tab = JSON.parse(localStorage.getItem(clé) || "[]");

  Tab.splice(position,1);

  localStorage.setItem(clé, JSON.stringify(Tab));

  location.reload();
}
//--------------------------------------------------add admins-------------------//

function insertAdmins() {
    
    var admin1 = {
        id : 1,
        firstName : "admin1",
        lastName : "admin1",
        email : "admin1@gmail.com",
        password : "123admin",
        tel : "22222222",
        role : "admin"
    };

    var admin2 = {
        id : 2,
        firstName : "admin2",
        lastName : "admin2",
        email : "admin2@gmail.com",
        password : "123admin",
        tel : "11111111",
        role : "admin"
    };

    var users = JSON.parse(localStorage.getItem("users") || "[]");

    users.push(admin1);
    users.push(admin2);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("adminsAdded",true);

}
//-------------------------fonction login and logout---------------//

function login() {
    // alert("test");
    var email = document.getElementById("email*").value;
    var password = document.getElementById("password*").value;

    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var repMans = JSON.parse(localStorage.getItem("repMans") || "[]");
    var findedUser;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password ) {
            findedUser = users[i]
        }        
    }
    for (let i = 0; i < repMans.length; i++) {
      if (repMans[i].email == email && repMans[i].password == password ) {
        findedUser = repMans[i]
    }   
    }

    console.log("findedUser", findedUser);

    if (findedUser) {
        localStorage.setItem("connectedUser",JSON.stringify(findedUser));


        // User exist in LS
            if (findedUser.role == "client") {

                location.replace('index.html');
            } 
            else { 
              if (findedUser.role == "repairMan") {
                location.replace('index.html'); }

              else{ location.replace('dashboardAdmin.html'); }
              } 

    } else {
        // User not exist
        document.getElementById("error").innerHTML = "Please try again!";
        document.getElementById("error").style.color="red";
    }
}

//----------------------------------------add products----------------//

function addProduct() {
    // Get value from input
    var productName = document.getElementById("productName").value;
    // verif if productname > 6
    var verifProductName = verifLength(productName, 6);


    // verif if product exists
    var verifIfPrExist = searchProduct(productName);
    if (verifIfPrExist) {
      document.getElementById("productNameExistError").innerHTML =
        "Product already exists";
      document.getElementById("productNameExistError").style.color = "red";
    } else {
      document.getElementById("productNameError").innerHTML = "";
    }

    if (verifProductName) {
      document.getElementById("productNameError").innerHTML = "";
    } else {
      document.getElementById("productNameError").innerHTML =
        "Product Name must have at least 6 characters";
      document.getElementById("productNameError").style.color = "red";
    }
    var price = document.getElementById("price").value;
    var verifPrice = price > 0;
    if (verifPrice) {
      document.getElementById("priceError").innerHTML = "";
    } else {
      document.getElementById("priceError").innerHTML =
        "Price must be greater then 0";
      document.getElementById("priceError").style.color = "red";
    }
    var stock = document.getElementById("stock").value;
    var verifStock = stock > 10;
    if (verifStock) {
      document.getElementById("stockError").innerHTML = "";
    } else {
      document.getElementById("stockError").innerHTML = "Invalid stock (>10)";
      document.getElementById("stockError").style.color = "red";
    }
    var category = document.getElementById("category").value;
    // var verifCategory = category.length !== 0;
    // if (verifCategory) {
    //   document.getElementById("categoryError").innerHTML = "";
    // } else {
    //   document.getElementById("categoryError").innerHTML = "Invalid category";
    //   document.getElementById("categoryError").style.color = "red";
    // }
    // // emplacement avec fakepath
    var productImage = document.getElementById("image").value;
    // appel de la fonction replaceCh pour ajuster l'emplacement
    var image = replaceCh(productImage);

    if (
      verifProductName &&
      verifPrice &&
      verifStock &&
      // verifCategory &&
      !verifIfPrExist
    ) {
      var idProduct = JSON.parse(localStorage.getItem("idProduct") || "1");
      var product = {
        id: idProduct,
        productName: productName,
        price: price,
        stock: stock,
        category: category,
        image : image
      };
      var products = JSON.parse(localStorage.getItem("products") || "[]");
      products.push(product);
      localStorage.setItem("products", JSON.stringify(products));
      localStorage.setItem("idProduct", idProduct + 1);
      location.reload();
    }
  }

  function searchProduct(productName) {
    var products = JSON.parse(localStorage.getItem("products") || "[]");

    for (let i = 0; i < products.length; i++) {
          if (products[i].productName == productName) {
              return true ;
          }          
    }

    return false;
}

function replaceCh(ch) {


   var newCh = ch.replace(/\\/g, "/");
  var res = newCh.replace("fakepath", "Users/Lenovo/Downloads/autorepair-master/autorepair-master/images"); 

  return res;

}

//----------------------------------------------displaying products added dashboard------------//
function displayProducts() {
  var products = JSON.parse(localStorage.getItem("products") || "[]");
  var productsTable = `<table class="table" id="tab2">
<thead>
  <tr>
    <th scope="col">Id</th>
    <th scope="col">Product Name</th>
    <th scope="col">Price</th>
    <th scope="col">Stok</th>
    <th scope="col">Category</th>
    
</tr>
</thead>
<tbody>`;

  for (let i = 0; i < products.length; i++) {
    productsTable = productsTable + ` 
  <tr>
    <th scope="row">${products[i].id}</th>
    <td>${products[i].productName}</td>
    <td>${products[i].price}</td>
    <td>${products[i].stock}</td>
    <td>${products[i].category}</td>
    <td>
        <button type="button" class="btn btn-success" onclick="editProduct(${products[i].id})">Update</button>
        <button type="button" class="btn btn-danger" onclick="deleteObject(${i},'products')" >Delete</button>
    </td>
  </tr>
  `;
  }
  productsTable = productsTable + `
</tbody>
</table>`;
  document.getElementById("productsTable").innerHTML = productsTable;


}
//------------------------------------edit delete products--------------------------//
function editProduct(id) {
  var product = searchById(id, "products");
  console.log(product);

  var editProductForm = `<div class="col-md-12 form-group">
  <input type="number" class="form-control" id="price" name="name" placeholder="price" onfocus="this.placeholder = ''" onblur="this.placeholder = 'price'" value="${product.price}">

  <span id="priceError"></span>
</div>

<div class="col-md-12 form-group">
  <input type="number" class="form-control" id="stock" name="name" placeholder="stock" onfocus="this.placeholder = ''" onblur="this.placeholder = 'stock'" value="${product.stock}">

  <span id="stockError"></span>
</div>
<div class="col-md-12 form-group">
<button type="submit" value="submit" class=" btn btn-warning" onclick="validateEditProduct(${product.id})">validate </button>
</div>`;

  document.getElementById('editProduct').innerHTML = editProductForm;
}

function validateEditProduct(id) {
  var newPrice = document.getElementById("price").value;
  var newStock = document.getElementById("stock").value;

  var products = JSON.parse(localStorage.getItem("products") || "[]");


  if (Number(newPrice) > 0) {
    document.getElementById("priceError").innerHTML = "";
  } else {
    document.getElementById("priceError").innerHTML =
      "price must be strict positive";
    document.getElementById("priceError").style.color = "red";
  }
  //-------------------------------------------*--------------------------------//
  if (Number(newStock) > 10) {
    document.getElementById("stockError").innerHTML = "";
  } else {
    document.getElementById("stockError").innerHTML = "stock must be above 10";
    document.getElementById("stockError").style.color = "red";
  }


  if (Number(newPrice) > 0 && Number(newStock) > 10) {

    for (let i = 0; i < products.length; i++) {
      if (products[i].id == id) {
        products[i].price = newPrice;
        products[i].stock = newStock;

      }
    }



    // sauvegarde du mise a jour 
    localStorage.setItem("products", JSON.stringify(products));
    location.reload();
  }

}
//--------------------------------------------------------dispaly productss in shop store ------------------------------//
function displayShopProducts() {
  var products = JSON.parse(localStorage.getItem("products") || "[]");
  var shopProducts1 = ``;
  var shopProducts2 = ``;
  var shopProducts3 = ``;
  for (let i = 0; i < products.length; i++) {
    if (products[i].category=="SMART PHONES") {
      
    
    shopProducts1 += `
    <div class="col-lg-3">
    <div class="cards-list">
  
        <div class="card 1">
          <div class="card_image"> <img src="${products[i].image}" style="width: 280px;" onclick="goToReservation(${products[i].id})"/>
          </div>
          <div class="card_title title-white">
            <h6 style="padding:5px ; background-color: rgba(141, 141, 175, 0.89); font-size: 20px;border-radius: 2px;text-align: left; font-family: fantasy;">${products[i].productName}</h6>
            <h6 style="width: 80px;height: 20px;margin-left:5px ; background-color: rgba(0, 0, 250, 0.616); font-size: 18px;border-radius: 2px;text-align: left;font-family: fantasy;">${products[i].price} TND</h6>
        
          </div>
        </div>
        </div>
        
  </div>`;
  
  }else if (products[i].category=="LAPTOP/PC") {
    shopProducts2 += `
    <div class="col-lg-3">
    <div class="cards-list">
  
        <div class="card 1">
          <div class="card_image"> <img src="${products[i].image}" style="width: 280px;" onclick="goToReservation(${products[i].id})"/>
          </div>
          <div class="card_title title-white">
          <h6 style="padding:5px ; background-color: rgba(141, 141, 175, 0.89); font-size: 20px;border-radius: 2px;text-align: left; font-family: fantasy;">${products[i].productName}</h6>
          <h6 style="width: 80px;height: 20px;margin-left:5px ; background-color: rgba(0, 0, 250, 0.616); font-size: 18px;border-radius: 2px;text-align: left;font-family: fantasy;">${products[i].price} TND</h6>
      
          </div>
        </div>
        </div>
        
  </div>`;  
  }else{
    shopProducts3 += `
    <div class="col-lg-3">
    <div class="cards-list">
  
        <div class="card 1">
          <div class="card_image"> <img src="${products[i].image}" style="width: 280px;" onclick="goToReservation(${products[i].id})"/>
          </div>
          <div class="card_title title-white">
          <h6 style="padding:5px ; background-color: rgba(141, 141, 175, 0.89); font-size: 20px;border-radius: 2px;text-align: left; font-family: fantasy;">${products[i].productName}</h6>
          <h6 style="width: 80px;height: 20px;margin-left:5px ; background-color: rgba(0, 0, 250, 0.616); font-size: 18px;border-radius: 2px;text-align: left;font-family: fantasy;">${products[i].price} TND</h6>
    
          </div>
        </div>
        </div>
        
  </div>`;  
  
  }
  }
  document.getElementById("shopProductsPhones").innerHTML = shopProducts1;
  document.getElementById("shopProductsLaptop").innerHTML = shopProducts2;
  document.getElementById("shopProductsConsole").innerHTML = shopProducts3;
  
  }
//---------------------------------------reservation-------------------//
function goToReservation(id) {
    localStorage.setItem("idPrToReserve",id);
    location.replace('productDetails.html');
}

function displayProductDetails() {
    var idProduct = localStorage.getItem("idPrToReserve");
    var product = searchById(idProduct,"products");
    console.log(product);
    document.getElementById("productName").innerHTML = product.productName;
    document.getElementById("price").innerHTML = product.price + "DT";
    document.getElementById("category").innerHTML = product.category;
    document.getElementById("stock").innerHTML = product.stock + " pieces";
    document.getElementById("image").src = product.image;
    
}
//----------------------------------------------validate the reservation of product----------------------------//

function validateReservation() {
  // Récupération de la quantité à partir de l'input
  var qty = document.getElementById("qty").value;
  // Récupération de l'id du produit à reserver
  var idProduct = localStorage.getItem("idPrToReserve");
  // Recherche du produit à travers son id
  var product = searchById(idProduct,"products");

  // Test de la disponibilité du stock
  if ((Number(qty)> product.stock) || Number(qty)<=0) {
      //Stock Indisponible ou invalide : affichage du msg d'erreur
      document.getElementById("qtyError").innerHTML = "Invalid Qty";
      document.getElementById("qtyError").style.color = "red";

  } else {
      // Stock disponible
      document.getElementById("qtyError").innerHTML="";
      // Récuperation des anciennes commandes dans LS
      var orders = JSON.parse(localStorage.getItem("orders") || "[]");
      // Récupération de l'id de la commande (order)
      var idOrder = JSON.parse(localStorage.getItem("idOrder") || "1");
      // Récupération des informations du l'utilisateur connecté
      var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

      // Regroupement des informations de la commande dans un objet order
      var order = {
          id : idOrder,
          idProduct : idProduct,
          idUser : connectedUser.id,
          qty : Number(qty)    
      };

      // Ajour de l'objet order dans le tableau orders
      orders.push(order);
      // Sauvegarde du tableau orders dans LS
      localStorage.setItem("orders",JSON.stringify(orders));
      // Incrémentation de l'idOrder et sauvegarde pour la prochaine commande
      localStorage.setItem("idOrder", idOrder+1);
      // location.reload();
      
      //  2ème étape : Mise à jour du stock du produit

      // Recupération des tous les produits dans LS
      var products = JSON.parse(localStorage.getItem("products") || "[]");
      // Parcours du tableau products + recherche du produit à modifier + modification du stock 
      for (let i = 0; i < products.length; i++) {
          if (products[i].id == idProduct) {
              products[i].stock = products[i].stock - Number(qty);
          }
          
      }
      // Sauvegarde du tableau products mis à jour
      localStorage.setItem("products", JSON.stringify(products));
  }
}

function basket() {
  // Recupération des informations de l'utilisateur connecté
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  // Récupération de toutes les commandes de tous les utilisateurs
  var orders = JSON.parse(localStorage.getItem("orders") || "[]");
  // Déclaration d'un tableau vide pour affecter les commandes de l'utlisateur connecté
  var myOrders = [];

  // Parcours du tableau des commandes et recherche des commandes de l'utlisateur connecté
  // Filtrage
  for (let i = 0; i < orders.length; i++) {
      if (orders[i].idUser == connectedUser.id) {
          myOrders.push(orders[i]);
      }
      
  }

  // Part 1
  var cart = `
  <table class="table table-striped table-hover table-bordered" style="margin-top:50px">
  <thead class="thead-primary">
      <tr>
          <th scope="col">Product</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Total</th>
          <th scope="col">Actions</th>

      </tr>
  </thead>
  <tbody>`;
  var subTotal = 0;
  for (let i = 0; i < myOrders.length; i++) {
      // Recherche du produit à travers son id pour pouvoir afficher son nom et son prix
      var product = searchById(myOrders[i].idProduct,"products");
      var total = Number(product.price) * Number(myOrders[i].qty);
      subTotal += total;
          // Part 2
   cart += `   <tr>
   <td>
       <div class="media">
           <div class="d-flex">
               <img src="${product.image}" alt="" style="width:180px;height:150px;border-radius: 20px;">
           </div>
           <div class="media-body" style="text-align:center;font-family: fantasy;font-size:18px">
               <p>${product.productName}</p>
           </div>
       </div>
   </td>
   <td>
       <h5>${product.price} DT</h5>
   </td>
   <td>
       <h5>${myOrders[i].qty} pieces</h5>
   </td>
   <td>
       <h5>${total} DT</h5>
   </td>
   <td>
   <button type="button" class="btn btn-success" onclick="editOrder(${myOrders[i].id})">Edit</button>
   <button type="button" class="btn btn-danger" onclick="deleteOrder(${myOrders[i].id})">Delete</button>
   </td>
</tr>
`;
      
  }

    
  // part 3
  cart += `    <tr>
          <td>

          </td>
          <td>

          </td>
          <td>
              <h5>Subtotal</h5>
          </td>
          <td>
              <h5>${subTotal} DT</h5>
          </td>
      </tr>
  
      
  </tbody>
</table>`;

document.getElementById("cart").innerHTML = cart;
}

function editOrder(id) {
  var order = searchById(id,"orders");
  var editOrderForm= `
  <div class="col-md-12 form-group">
  <input type="number" class="form-control" id="qty" name="name" placeholder="Quantity" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Quantity'" value=${order.qty}>
  <span id="qtyError"></span>
  </div>
  
  <div class="col-md-12 form-group">
  <button type="submit" value="submit" class="primary-btn" onclick="validateEditOrder(${order.id})">Validate</button>
  </div>

  `;
  
  document.getElementById("editOrderForm").innerHTML = editOrderForm;
}

function validateEditOrder(id) {
  var newQty = document.getElementById("qty").value;
  console.log(newQty);
  var order = searchById(id,"orders");
  console.log(order);
  var diff = Number(newQty) - Number(order.qty);
  console.log(diff);
  var product = searchById(order.idProduct,"products");

  if (newQty<=0 || diff>product.stock  ) {
      document.getElementById("qtyError").innerHTML = "Invalid Qty";
      document.getElementById("qtyError").style.color = "red";
  }
  else{
      document.getElementById("qtyError").innerHTML = "";

      // Mise à jour de la quantité dans la commande
      var orders = JSON.parse(localStorage.getItem("orders") || "[]");
      for (let i = 0; i < orders.length; i++) {
          if (orders[i].id == id) {
              orders[i].qty = Number(newQty);
          }
          
      }
      localStorage.setItem("orders",JSON.stringify(orders));
      
      // Mise à jour du stock du produit
      var products = JSON.parse(localStorage.getItem("products") || "[]");
      for (let i = 0; i < products.length; i++) {
          if (products[i].id == order.idProduct ) {
              products[i].stock = Number(products[i].stock) - Number(diff);
          }
          
      }
      localStorage.setItem("products",JSON.stringify(products));
      location.reload();
  }
}

function deleteOrder(id) {
  var order = searchById(id,"orders");

  // Mise à ajour du stock
  var products = JSON.parse(localStorage.getItem("products") || '[]');

  for (let i = 0; i < products.length; i++) {
      if (products[i].id == order.idProduct) {
          // Mise à jour
          products[i].stock = Number(products[i].stock) + Number(order.qty);
      }
      
  }

  localStorage.setItem("products",JSON.stringify(products));

  // Suppression de la commande

  var orders = JSON.parse(localStorage.getItem("orders") || "[]");
  var pos; 
  // Recherche de la position de la commande à supprimer
  for (let i = 0; i < orders.length; i++) {
     if (orders[i].id== order.id) {
         pos = i;
     }
      
  }

  deleteObject(pos,"orders");
  location.reload();
}

// ------------------------------------------------------------------------------------------------------------//

function addRepairmain() {
  // Recuperation des données
    var firstName = document.getElementById('firstName**').value;
    var verifFirstName = verifLength(firstName,3);

    if (verifFirstName) {
        document.getElementById("firstNameError**").innerHTML = "";

    } else {
        
        document.getElementById("firstNameError**").innerHTML = "First name must have at least 3 characters";
        document.getElementById('firstNameError**').style.color = "red";

    }

    var lastName = document.getElementById('lastName**').value;

    var verifLastName = verifLength(lastName,5);

    if (verifLastName) {
        document.getElementById("lastNameError**").innerHTML = "";

    } else {
        
        document.getElementById("lastNameError**").innerHTML = "Last name must have at least 5 characters";
        document.getElementById('lastNameError**').style.color = "red";
    }

    var email = document.getElementById('email**').value;
    var verifEmail = validateEmail(email);
    if (verifEmail) {
        document.getElementById("emailError**").innerHTML = "";

    } else {
        
        document.getElementById("emailError**").innerHTML = "Invalid Email";
        document.getElementById('emailError**').style.color = "red";
    }
    var emailExist = userExist(email);
    if (!emailExist) {
        document.getElementById("emailExistError**").innerHTML = "";

    } else {
        
        document.getElementById("emailExistError**").innerHTML = "Email already exist";
        document.getElementById('emailExistError**').style.color = "red";
    }

    var password = document.getElementById('password**').value;
    var verifPassword = verifLength(password,8);
    console.log(verifPassword);

    if (verifPassword) {
        document.getElementById("passwordError**").innerHTML = "";

    } else {
        
        document.getElementById("passwordError**").innerHTML = "Password must have at least 8 characters";
        document.getElementById('passwordError**').style.color = "red";

    }

    var confirmPwd = document.getElementById('confirmPwd**').value;
    if (confirmPwd == password) {
        document.getElementById("confirmPasswordError**").innerHTML = "";

    } else {
        document.getElementById("confirmPasswordError**").innerHTML = "Invalid confirmation";
        document.getElementById("confirmPasswordError**").style.color="red";
    }
    var tel = document.getElementById('tel**').value;
    if ((tel.length == 8 )&&(isNaN(tel)==false)) {
        document.getElementById("telError**").innerHTML = "";

    } else {
        document.getElementById("telError**").innerHTML = "Invalid tel";
        document.getElementById("telError**").style.color = "red";
    }

    var repImage = document.getElementById("image**").value;
    // appel de la fonction replaceCh pour ajuster l'emplacement
    var image = replaceCh(repImage);
    var address= document.getElementById("address").value;

 
    var dates =document.getElementById("selectedValues").value;
    


    if (verifFirstName && verifLastName && verifEmail && verifPassword && (confirmPwd == password) &&  (tel.length == 8 ) && (isNaN(tel)==false) && (!emailExist)) {
        // Regroupement des valeurs 
        
        var idrep = JSON.parse(localStorage.getItem("idrep") || "100");
    
var repMan = {
        id : idrep,
        firstName : firstName,
        lastName : lastName,
        email: email,
        password : password,
        confirmPwd : confirmPwd,
        tel : tel,
        image:image,
        address:address,
        role :  "repairMan",
        dates : dates
    };        

    // Récupération des anciennes valeurs dans LS
    // localStorage.setItem("repMans",JSON.stringify(repMan));
   
    
    var repMans = JSON.parse(localStorage.getItem("repMans") || "[]") ;
    // Ajout de l'objet user dans le tableau usersTab
    repMans.push(repMan);
    // Sauvegarde du tableau usersTab (mis à jour)
    localStorage.setItem("repMans",JSON.stringify(repMans));
    localStorage.setItem("idrep" , idrep + 1);
    location.reload();
    }
}

function displayRepMan() {
  var repMans = JSON.parse(localStorage.getItem("repMans") || "[]");
  var repMansTable = `
  <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Id</th>
                          <th scope="col">First Name</th>
                          <th scope="col">Last Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Tel</th>
                          <th scope="col">Role</th>
                          <th scope="col">Address</th>
                          <th scope="col">Actions</th>
                          

                        </tr>
                      </thead>
                      <tbody>`;

  for (let i = 0; i < repMans.length; i++) {

    repMansTable = repMansTable  + `
      <tr>
                          <th scope="row">${repMans[i].id}</th>
                          <td>${repMans[i].firstName}</td>
                          <td>${repMans[i].lastName}</td>
                          <td>${repMans[i].email}</td>
                          <td>${repMans[i].tel}</td>
                          <td>${repMans[i].role}</td>
                          <td>${repMans[i].address}</td>
                          <td>
                              <button type="button" class="btn btn-success" onclick="editrepman(${repMans[i].id})">Update</button>
                              <button type="button" class="btn btn-danger" onclick="deleteObject(${i},'repMans')">Delete</button>

                          </td>

      </tr>
      `;


  }

  repMansTable = repMansTable + `
  </tbody>
  </table>`;


  document.getElementById("repMansTable").innerHTML =  repMansTable;
}

function repmanList() {
var repMans=JSON.parse(localStorage.getItem('repMans')||"[]");
var sDate=document.getElementById("checkDate").value;
var citySearch=document.getElementById("citySearch").value;
var replist=`<span style="font-size:20px;color:red;margin-left:35%;margin-top:20px">NO AVAILABLE REPAIRMAN PLEASE CHOOSE ANOTHER DATE/CITY</span>`;
// var searchDate = sDate.replace(/-/g, "/");
searchDate=formatDate(sDate);

console.log(searchDate);

for (let i = 0; i < repMans.length; i++) {
 if (repMans[i].address==citySearch) {



var unavDates = repMans[i].dates.split(', ');
console.log(unavDates);
var n=unavDates.length;
console.log(n);
var j=0;
while (unavDates[j]!=searchDate & j<n ) {
j+=1;  
}
console.log(j);
if (j==n) {
  replist=``;
  replist+=`
  <div class="col-lg-3">
  <div class="card-list" style="width: 18rem;">
  
	<img class="card-img-top" style="width:200px" src="${repMans[i].image}" onclick="goToAppoint(${repMans[i].id})" alt="Card image cap">
	<div class="card-body">
	  <h5 class="card-title">${repMans[i].firstName} ${repMans[i].lastName}</h5>
	</div>
	<ul class="list-group list-group-flush">
	  <li class="list-group-item">${repMans[i].address}</li>
	  <li class="list-group-item"><p style="color:green">Availabe in this date</p></li>
	</ul>

  </div> 
  </div> 
  `; 
 
}

}
}

document.getElementById("repmans").innerHTML= replist;

} 

function editrepman(id) {
  // alert("test");
  var rep = searchById(id,"repMans");
  var editrep= `
  <div class="col-md-12 form-group">
  <input type="password" class="form-control" id="newPass" name="name" placeholder="Password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'" value=${rep.password}>
  <span id="passwordError"></span>
  </div>
  <div class="col-md-12 form-group">
  <input type="tel" class="form-control" id="newT" name="name" placeholder="Tel" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Tel'" value=${rep.tel}>
  <span id="telError"></span>

  </div>
  <div class="col-md-12 form-group">
  <button type="submit" value="submit" class="btn btn-warning" onclick="validateEditrepmain(${rep.id})">Validate</button>
  </div>

  `;
  
  document.getElementById("editrepman").innerHTML = editrep;

}
function validateEditrepmain(id) {
  // Recupération des nouvelles valeurs

  var newPassword = document.getElementById('newPass').value;
  var verifPassword = verifLength(newPassword,8);
console.log(newPassword);

  if (verifPassword) {
      document.getElementById("passwordError").innerHTML = "";

  } else {
      
      document.getElementById("passwordError").innerHTML = "Password must have at least 8 characters";
      document.getElementById('passwordError').style.color = "red";

  }
  var newTel = document.getElementById('newT').value;
  if ((newTel.length == 8 )&&(isNaN(newTel)==false)) {
      document.getElementById("telError").innerHTML = "";

  } else {
      document.getElementById("telError").innerHTML = "Invalid tel";
      document.getElementById("telError").style.color = "red";
  }

  if (verifPassword && (newTel.length == 8 )&&(isNaN(newTel)==false)) {
  // Récupération des utilisateurs dans LS
  var repMans = JSON.parse(localStorage.getItem("repMans") || '[]');
  // Parcours tab, recherche user à modifier et modifications du password et tel
  for (let i = 0; i < repMans.length; i++) {
      if (repMans[i].id == id) {
          repMans[i].password = newPassword;
          repMans[i].tel = newTel;

      }
      
  }
  // Sauvegarde du mise à jour
  localStorage.setItem("repMans",JSON.stringify(repMans));
  // refresh de la page
  location.reload();

  }

 
}


function formatDate (input) {
  var datePart = input.match(/\d+/g),
  year = datePart[0], 
  month = datePart[1], day = datePart[2];

  return month+'/'+day+'/'+year;
}

function goToAppoint (id){
var connectedUser=JSON.parse(localStorage.getItem("connectedUser")|| "[]");
var sDate=document.getElementById("checkDate").value;
var xdate=``;

  localStorage.setItem("idRepToReserve",id);
  localStorage.setItem("idClientToReserve",connectedUser.id);

  localStorage.setItem("appointDate",sDate);
  location.replace('orderForm.html');
}

function koko() {

  var lll=localStorage.getItem("appointDate")|| "[]";
  console.log(lll);
  document.getElementById("appointtDate").innerHTML=lll; 


}

function appointList() {

  var deviceName = document.getElementById("deviceName").value;
  // verif if deviceName > 6
  if (verifLength(deviceName, 6)) {
    document.getElementById("devNameError").innerHTML = "";
  } else {
    document.getElementById("devNameError").innerHTML =
      "Device Name must have at least 6 characters";
    document.getElementById("devNameError").style.color = "red";
  }
   var deviceColor=document.getElementById("deviceColor").value;
  var deviceSerial = document.getElementById("deviceSerial").value;
  
  if (deviceSerial.length==15) {
    document.getElementById("serialError").innerHTML = "";
  } else {
    document.getElementById("serialError").innerHTML =
      "IMEI must be 15 digit";
    document.getElementById("serialError").style.color = "red";
  }
  var Adate =localStorage.getItem("appointDate")|| "[]";
  var timeHour = document.getElementById("timeHour").value;

  var category = document.getElementById("deviceCategory").value;

  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  var idRepToReserve = JSON.parse(localStorage.getItem("idRepToReserve"));
 
  var probDetails =document.getElementById("probDetails").value;

if (
verifLength(deviceName, 6)&&
deviceSerial.length==15 &&
timeHour!="" &&
category !="" 
) {
  var idAppoint = JSON.parse(localStorage.getItem("idAppoint") || "200");
  
  var appointment = {
    id: idAppoint,
    date :Adate ,
    hour:timeHour,
    idRepairman: idRepToReserve,
    idClient: connectedUser.id,
    deviceCategory :category ,
    deviceName: deviceName,
    deviceSerial : deviceSerial,
    deviceColor:deviceColor,
    Problem :probDetails

  };
  var appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
  appointments.push(appointment);
  localStorage.setItem("appointments", JSON.stringify(appointments));
  localStorage.setItem("idAppoint", idAppoint + 1);
  location.reload();
  



}

}

function setHeader() {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

  if (connectedUser) {
      // fama utilisateur connecté
      if (connectedUser.role == "client") {
          // Links mta3 client
          var variable =`<span style="font-size: 40px;color: black;" id="bagCart" class="fas fa-shopping-cart" >`

          var header = `

            <li class="nav-item"><a class="nav-link noHover" style="margin-left:-150px" > <b>Hello ${connectedUser.firstName},</b></a></li>
            <li class="nav-item"><a href="index.html" class="nav-link">Home</a></li>
            <li class="nav-item"><a href="store.html" class="nav-link">Store</a></li>
            <li class="nav-item"><a href="RepManList.html" class="nav-link">Find a repairman</a></li>
	        	<li class="nav-item"><a href="about.html" class="nav-link">About</a></li>
	          <li class="nav-item"><a href="contact.html" class="nav-link">Contact</a></li>
            <li class="nav-item"><a href="ClientAppointments.html" class="nav-link">Your appointments</a></li>
			  <li class="nav-item" style="margin-left: 50px;"><a class="nav-link" href="#" data-toggle="modal" onclick="logOut()"><span style="font-size: 16px;"><i class="fas fa-sign-in-alt" style="font-size: 22px;"></i> LogOut</span></a></li>
`
      document.getElementById("linksId").innerHTML = header;
      document.getElementById("bagCart").innerHTML = variable;

      } else {
        if (connectedUser.role == "repairMan") {
          var header = `
        
          <li class="nav-item"><a class="nav-link noHover"><img style="width:280px;height:100px;margin-right:5px;margin-left:-140px"  src="${connectedUser.image}" alt="" class="rounded-circle img-thumbnail "></a></li>
          <li class="nav-item"><a class="nav-link noHover" style="margin-left:-120px;font-size:14px"><b> Hello ${connectedUser.firstName},</b></a></li>
          <li class="nav-item"><a href="index.html" class="nav-link">Home</a></li>
            <li class="nav-item"><a href="appointments.html" class="nav-link">Your appointments</a></li>
	          <li class="nav-item"><a href="contact.html" class="nav-link">Contact</a></li>
            <li class="nav-item" style="margin-left: 50px;"><a class="nav-link" href="#" data-toggle="modal" onclick="logOut()"><span style="font-size: 16px;"><i class="fas fa-sign-in-alt" style="font-size: 22px;"></i> LogOut</span></a></li>
            
            `
      document.getElementById("linksId").innerHTML = header;
        }
        else{
          var header = `

          <li class="nav-item"><a class="nav-link noHover" style="margin-left:-120px;font-size:14px"><b> Hello ${connectedUser.firstName},</b></a></li>
            <li class="nav-item"><a href="index.html" class="nav-link">Home</a></li>
	        	<li class="nav-item"><a href="addProduct.html" class="nav-link">Add product</a></li>
	        	<li class="nav-item"><a href="addRepairman.html" class="nav-link">Add Repairman</a></li>
	        	<li class="nav-item"><a href="dashboardAdmin.html" class="nav-link">Dashboard</a></li>
            <li class="nav-item" style="margin-left: 50px;"><a class="nav-link" href="#" data-toggle="modal" onclick="logOut()"><span style="font-size: 16px;"><i class="fas fa-sign-in-alt" style="font-size: 22px;"></i> LogOut</span></a></li>
            `
      document.getElementById("linksId").innerHTML = header;

        }   
      }
  } else {
      // mafamech (visiteur)
      var header = `

      <li class="nav-item"><a href="index.html" class="nav-link">Home</a></li>
      <li class="nav-item"><a href="about.html" class="nav-link">About</a></li>
      <li class="nav-item"><a href="store.html" class="nav-link">Store</a></li>
      <li class="nav-item"><a href="contact.html" class="nav-link">Contact</a></li>
  <li class="nav-item" style="margin-left: 50px;"><a class="nav-link" href="#" data-toggle="modal" data-target="#login"><span style="font-size: 16px;"><i class="fas fa-sign-in-alt" style="font-size: 22px;"></i>  Customer/Login</span></a></li>
`
document.getElementById("linksId").innerHTML = header;
  }
}

function logOut() {
  localStorage.removeItem("connectedUser");
  location.replace("index.html");
}

function repAppoint() {

  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  var appointments = JSON.parse(localStorage.getItem("appointments"));

  if (connectedUser.role=="repairMan") {

    var  apptab= `
    <table class="table table-striped table-hover table-bordered" style="margin-top:20px">
    <thead class="thead-primary">
        <tr>
            <th scope="col">Appointment date</th>
            <th scope="col">Client </th>
            <th scope="col">Device </th>
            <th scope="col">Color</th>
            <th scope="col">Device serial number</th>
            <th scope="col">Problem</th>  
        </tr>
    </thead>
    <tbody>`;  
  
    for (let i = 0; i < appointments.length; i++) {
   
      if (appointments[i].idRepairman==connectedUser.id) {
        client=searchById(appointments[i].idClient,"users");
        
// console.log(client);
        apptab+=`
         <tr>
   <td>
       <div class="media">
           <div class="d-flex">
           <p>${appointments[i].date}--${appointments[i].hour}</p>
           </div>
           <div class="media-body" style="text-align:center;font-family: fantasy;font-size:18px">
              
           </div>
       </div>
   </td>
   <td>
   <p>${client.firstName} ${client.lastName} </p>
   <p> phone:${client.tel}</p>
   <p>email:${client.email}</p>
   </td>
   <td>
       <p> ${appointments[i].deviceCategory}</p>
       <p> ${appointments[i].deviceName}</p>
   </td>
   <td>
       <p>${appointments[i].deviceColor}</p>
   </td>
   <td>
   <p>${appointments[i].deviceSerial}</p>
   </td>
   <td>
   <p>${appointments[i].Problem}</p>
   </td>

</tr>
`;
      }
    }

  }
  apptab+=`
  </tbody>
</table>`;  
  
  document.getElementById("repAppoint").innerHTML = apptab;
}

function ClpAppoint() {
  
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  var appointments = JSON.parse(localStorage.getItem("appointments"));

  if (connectedUser.role=="client") {

    var  apptab= `
    <table class="table table-striped table-hover table-bordered" style="margin-top:50px">
    <thead class="thead-primary">
        <tr>
            <th scope="col">Appointment date</th>
            <th scope="col">repairMan </th>
            <th scope="col">Device </th>
            <th scope="col">Color</th>
            <th scope="col">Device serial number</th>
            <th scope="col">Problem</th>  
        </tr>
    </thead>
    <tbody>`;  
  
    for (let i = 0; i < appointments.length; i++) {
   
      if (appointments[i].idClient==connectedUser.id) {
        repairMan=searchById(appointments[i].idRepairman,"repMans");
        
// console.log(client);
        apptab+=`
         <tr>
   <td>
       <div class="media">
           <div class="d-flex">
           <p>${appointments[i].date}--${appointments[i].hour}</p>
           </div>
           <div class="media-body" style="text-align:center;font-family: fantasy;font-size:18px">
              
           </div>
       </div>
   </td>
   <td>
   <p>${repairMan.firstName} ${repairMan.lastName} </p>
   <p> phone:${repairMan.tel}</p>
   <p>email:${repairMan.email}</p>
   </td>
   <td>
       <p> ${appointments[i].deviceCategory}</p>
       <p> ${appointments[i].deviceName}</p>
   </td>
   <td>
       <p>${appointments[i].deviceColor}</p>
   </td>
   <td>
   <p>${appointments[i].deviceSerial}</p>
   </td>
   <td>
   <p>${appointments[i].Problem}</p>
   </td>

</tr>
`;
      }
    }

  }
  apptab+=`
  </tbody>
</table>`;  
  
  document.getElementById("ClAppoint").innerHTML = apptab;
}
function bookappoint() {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  if (!connectedUser) {
    alert("please Sign up Or Register if you are not a client yet");  
  }else{

if (connectedUser.role=="client") {
  location.replace("RepManList.html") 
}}

}

function AdminTouAppoint() {
  var appointments = JSON.parse(localStorage.getItem("appointments") || "[]");


  var appointmentsTable = `<table class="table" id="tab2">
<thead>
  <tr>

  <th scope="col">Id</th>
  <th scope="col">Appointment date</th>
  <th scope="col">Client </th>
  <th scope="col">repairMan </th>
  <th scope="col">Device </th>
  <th scope="col">Color</th>
  <th scope="col">Device serial number</th>
  <th scope="col">Problem</th>  
    
</tr>
</thead>
<tbody>`;

  for (let i = 0; i < appointments.length; i++) {

    var repairMan=searchById(appointments[i].idRepairman,"repMans");
    var client=searchById(appointments[i].idClient,"users");

    appointmentsTable = appointmentsTable + ` 
  <tr>
    <th scope="row">${appointments[i].id}</th>
    <td>${appointments[i].date} ${appointments[i].hour}</td>
    <td>  
    
    <p>${client.firstName} ${client.lastName} </p>
    <p> phone:${client.tel}</p>
    <p>email:${client.email}</p>

    </td>
    <td>
    <p>${repairMan.firstName} ${repairMan.lastName} </p>
    <p> phone:${repairMan.tel}</p>
    <p>email:${repairMan.email}</p>
    </td>

<td>
       <p> ${appointments[i].deviceCategory}</p>
       <p> ${appointments[i].deviceName}</p>
   </td>
    <td>
    <p>${appointments[i].deviceColor}</p>
</td>
<td>
<p>${appointments[i].deviceSerial}</p>
</td>
<td>
<p>${appointments[i].Problem}</p>
</td>
    
  </tr>
  `;
  }
  appointmentsTable = appointmentsTable + `
</tbody>
</table>`;
  document.getElementById("appointmentsTable").innerHTML = appointmentsTable;


}  

function ordersNb() {
  var orders = JSON.parse(localStorage.getItem("orders") || "[]");
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  var nb = 0 ;
  if (connectedUser.role=="client") {
    
  
  for (let i = 0; i < orders.length; i++) {
     if (orders[i].idUser == connectedUser.id) {
         nb++;
     }
      
  }

console.log(nb);
  document.getElementById("ordersNb").innerHTML = "(" + nb + ")" ;
}



}