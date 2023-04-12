<?php

    class cConexion{

        public static function conexionBD(){
            $host = 'localhost'; //'127.0.0.1:33065';
            $bdname = 'pp3tp1bd';
            $usuario ='root';
            $pasword = '';

            try {
             
                $conn = new PDO("mysql:host=$host;bdname=$bdname",$usuario,$pasword);
                echo("Conectado");            

            } catch (\Throwable $exp) {
                
                echo("No se logro conectar:$bdname, error: $exp");
            }

            return $conn;

        }

    }

?>