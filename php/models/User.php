<?php
class User {
    public $user_id;
    public $username;
    public $email;
    public $password;
    public $role;

    public function __construct($user_id, $username, $email, $password, $role) {
        $this->user_id = $user_id;
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
        $this->role = $role;
    }
}
?>
