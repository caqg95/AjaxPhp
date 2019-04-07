<?php
    include('database.php');
    $query="SELECT * FROM task";
    $result=mysqli_query($connection,$query);
    if(!$result){
        die('Query Failed'.mysqli_error($connection));
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