<?php

class KirbyWebpack {
  private static $_instance;

  private function __clone () {}
  private function __construct () {
    $this->env = "development";
  }

  public static function _getInstance()
  {
    if (!isset(self::$_instance)) self::$_instance = new self();
    return self::$_instance;
  }

  public function config () {

  }

  public function isDev () {
    return !!($this->env === "development");
  }
}

function kirbyWebpack () {
  return KirbyWebpack::_getInstance();
}
