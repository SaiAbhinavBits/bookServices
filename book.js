const express = require('express');
const app = express();
// const amqp = require('amqplib');
const port = process.env.PORT || 3200;
// var channel , connection ;

app.listen(port, () => {
 console.log(`running at port ${port}`);
});
app.use(express.json());  
app.use(express.urlencoded({ extended: false }))


const books = [] ;

app.get('/book', (req,res) =>{
  res.send("This is endpoint")})

  // Post Book 

app.post("/new_book", (req, res) => {
    const book = req.body;
    if (book.book_name || book.author_name || book.publication_date || book.edition_no) {
    books.push({
    ...book,
    id: books.length + 1,
    date: Date.now().toString()
    });
    console.log();
    
    // const bookId = id ;
    res.status(200).json({
    bookId : books.id ,
    bookName : book.book_name,
    message: "Book Created successfully"
    });
 } 
 
 else {
   res.status(401).json({
   message: "Invalid book creation"
    });
    }
    });

   //get Book by id

   app.get("/book/:id", (req, res) => {
    const book_id = req.params.id;
    for(let bk of books){
    if(bk.id==book_id){
    return res.status(200).send(bk);
    }
    }
    res.status(404).json(
      {message:"Book not available"}
    )
    
   } );

    //get All books

    app.get("/get_books", (req, res) => {
      if(books.length!=0){
      res.status(200).send(books);
      }
      else if(books.length==0){
      res.status(404).json(
        {
message: "No books available"
        }
      );
      }
      else{
        res.status(400).json(
        {
  message: "Invalid input provided"
        }
        );
      }
     });

    

    //delete  book by id
    app.delete("/book/:id", (req, res) => {
      const book_id = req.params.id;
      for (let bk of books) {
      if (bk.id == book_id) {
      books.splice(books.indexOf(bk), 1);
      return res.status(200).json({
      message: "Deleted Successfully"
      });
      }
      }
      res.status(404).json({ message: "Invalid book Id" });
      });




  //     /////RabbitMQ messaging////
  //     amqp.connect()
  //     async function connect() {
  //       try{
  //         const amqpServer = "amqp://localhost:15672";
  //         connection = await amqp.connect(amqpServer);
  //         channel = await connection.createChannel();
  //         await channel.assertQueue("rabbit");

  //       }catch(err){
  //         console.log(err);
  //       }
  //     }

  // ///// Sending a parameter value to queue //////////
  //     app.get("/send",async (req,res) => {
  //       const bk_name = "dummy" ;
  //       await channel.sendToQueue("rabbit",Buffer.from(JSON.stringify(bk_name)));
  //       await channel.close();
  //       await connection.close();
  //       return res.send("done") ;
  //     }

  //     );