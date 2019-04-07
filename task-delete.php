<?php
    include('database.php');
    if(isset($_POST['Id'])){
        $Id=$_POST['Id'];
        $query="DELETE FROM task WHERE id=$Id";
        $result=mysqli_query($connection,$query);
        if(!$result){
            die('Query Failed.');
         }
         echo 'Task Deleted Successfull';
    }
?>
