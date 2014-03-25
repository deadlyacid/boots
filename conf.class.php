<?php

abstract class conf
{
    static private $protected = array(); //For DB / Passwords etc
    static private $public = array(); //For all public strings such as meta stuff for site

    public static function getProtected($key)
    {
        return isset(self::$protected[$key]) ? self::$protected[$key] : false;
    }

    public static function getPublic($key)
    {
        return isset(self::$public[$key]) ? self::$public[$key] : false;
    }

    public static function setProtected($key,$value)
    {
        self::$protected[$key] = $value;
    }

    public static function setPublic($key,$value)
    {
        self::$public[$key] = $value;
    }

    public function __get($key)
    {//$this->key // returns public->key
        return isset(self::$public[$key]) ? self::$public[$key] : false;
    }

    public function __isset($key)
    {
        return isset(self::$public[$key]);
    }
}

// Define configuration
define("DB_HOST", "localhost");
define("DB_USER", "root");
define("DB_PASS", "");
define("DB_NAME", "tim");

conf::setProtected('KenyonIP_Matalon','192.168.1.12');
conf::setProtected('KenyonIP_Tikva','192.168.1.13');


conf::setProtected('REMOTE_IP','192.168.1.12' );