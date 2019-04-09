<?php
    include('database.php');
    $Id= $_POST['Id'];
    $title=$_POST['title'];
    $description=$_POST['description'];

    $query="UPDATE task SET title='$title',description='$description' WHERE Id=$Id";
    $result=mysqli_query($connection,$query);
    if(!$result){
        die('Query Failed.');
     }
     echo 'Updated Task Successfull';
?>