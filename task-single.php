<?php
    include('database.php');
    $Id=$_POST['Id'];
    $query="SELECT * FROM task WHERE Id=$Id";
    $result=mysqli_query($connection,$query);
    if(!$result){
        die('Query Failed');
    }
    $json=array();
    while($row=mysqli_fetch_array($result)){
        $json[]=array(
            'title'=>$row['title'],
            'description'=>$row['description'],
            'Id'=>$row['Id']
        );
    }
    $jsonstring=json_encode($json);
    echo $jsonstring;
?>