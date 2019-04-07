<?php
    include('database.php');
    $search=$_POST['search'];
    if(!empty($search)){
        $query="SELECT * FROM task WHERE title LIKE '$search%'";
        $result=mysqli_query($connection,$query);
        if(!$result){
            die('Query Error'.mysqli_error($connection));
        }
        $json = array();
        while($row=mysqli_fetch_array($result)){
            $json[]=array(
                'title'=>$row['title'],
                'description'=>$row['description'],
                'Id'=>$row['Id']
            );
        }
        $jsonstring=json_encode($json);
        echo $jsonstring;
    }
?>