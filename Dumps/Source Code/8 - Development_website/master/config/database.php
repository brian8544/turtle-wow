<?php

use Illuminate\Support\Str;

return [

    /*
    |--------------------------------------------------------------------------
    | Default Database Connection Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the database connections below you wish
    | to use as your default connection for all database work. Of course
    | you may use many connections at once using the Database library.
    |
    */

    'default' => env('DB_CONNECTION', 'mysql'),

    /*
    |--------------------------------------------------------------------------
    | Database Connections
    |--------------------------------------------------------------------------
    |
    | Here are each of the database connections setup for your application.
    | Of course, examples of configuring each database platform that is
    | supported by Laravel is shown below to make development simple.
    |
    |
    | All database work in Laravel is done through the PHP PDO facilities
    | so make sure you have the driver for your particular database of
    | choice installed on your machine before you begin development.
    |
    */

    'connections' => [

        'sqlite' => [
            'driver' => 'sqlite',
            'url' => env('DATABASE_URL'),
            'database' => env('DB_DATABASE', database_path('database.sqlite')),
            'prefix' => '',
            'foreign_key_constraints' => env('DB_FOREIGN_KEYS', true),
        ],

        'mysql' => [
            'driver' => 'mysql',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        'mysql2' => [
            'driver' => env('DB_CONNECTION_2'),
            'url' => env('DATABASE_URL'),
            'host' => env('DB_TURTLE_AUTH_HOST', '127.0.0.1'),
            'port' => env('DB_TURTLE_AUTH_PORT', '3306'),
            'database' => env('DB_TURTLE_AUTH_DATABASE', 'auth'),
            'username' => env('DB_TURTLE_AUTH_USERNAME', 'turtle'),
            'password' => env('DB_TURTLE_AUTH_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => false,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        'mysql3' => [
            'driver' => env('DB_CONNECTION_3'),
            'url' => env('DATABASE_URL'),
            'host' => env('DB_TURTLE_CHARACTERS_HOST_1', '127.0.0.1'),
            'port' => env('DB_TURTLE_CHARACTERS_PORT_1', '3306'),
            'database' => env('DB_TURTLE_CHARACTERS_DATABASE_1', 'characters'),
            'username' => env('DB_TURTLE_CHARACTERS_USERNAME_1', 'turtle'),
            'password' => env('DB_TURTLE_CHARACTERS_PASSWORD_1', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => false,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        'mysql4' => [
            'driver' => env('DB_CONNECTION_4'),
            'url' => env('DATABASE_URL'),
            'host' => env('DB_TURTLE_WORLD_HOST', '127.0.0.1'),
            'port' => env('DB_TURTLE_WORLD_PORT', '3306'),
            'database' => env('DB_TURTLE_WORLD_DATABASE', 'world'),
            'username' => env('DB_TURTLE_WORLD_USERNAME', 'turtle'),
            'password' => env('DB_TURTLE_WORLD_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        'mysql5' => [
            'driver' => env('DB_CONNECTION_5'),
            'url' => env('DATABASE_URL'),
            'host' => env('DB_TURTLE_CHARACTERS_HOST_2', '127.0.0.1'),
            'port' => env('DB_TURTLE_CHARACTERS_PORT_2', '3306'),
            'database' => env('DB_TURTLE_CHARACTERS_DATABASE_2', 'characters'),
            'username' => env('DB_TURTLE_CHARACTERS_USERNAME_2', 'turtle'),
            'password' => env('DB_TURTLE_CHARACTERS_PASSWORD_2', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => false,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        'mysql6' => [
            'driver' => env('DB_CONNECTION_6'),
            'url' => env('DATABASE_URL'),
            'host' => env('DB_TURTLE_CHARACTERS_HOST_3', '127.0.0.1'),
            'port' => env('DB_TURTLE_CHARACTERS_PORT_3', '3306'),
            'database' => env('DB_TURTLE_CHARACTERS_DATABASE_3', 'characters'),
            'username' => env('DB_TURTLE_CHARACTERS_USERNAME_3', 'turtle'),
            'password' => env('DB_TURTLE_CHARACTERS_PASSWORD_3', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => false,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        'mysql7' => [
            'driver' => env('DB_CONNECTION_7'),
            'url' => env('DATABASE_URL'),
            'host' => env('DB_TURTLE_CHARACTERS_HOST_4', '127.0.0.1'),
            'port' => env('DB_TURTLE_CHARACTERS_PORT_4', '3306'),
            'database' => env('DB_TURTLE_CHARACTERS_DATABASE_4', 'characters'),
            'username' => env('DB_TURTLE_CHARACTERS_USERNAME_4', 'turtle'),
            'password' => env('DB_TURTLE_CHARACTERS_PASSWORD_4', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => false,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        'mysql8' => [
            'driver' => env('DB_CONNECTION_8'),
            'url' => env('DATABASE_URL'),
            'host' => env('DB_TURTLE_CHARACTERS_HOST_5', '127.0.0.1'),
            'port' => env('DB_TURTLE_CHARACTERS_PORT_5', '3306'),
            'database' => env('DB_TURTLE_CHARACTERS_DATABASE_5', 'characters'),
            'username' => env('DB_TURTLE_CHARACTERS_USERNAME_5', 'turtle'),
            'password' => env('DB_TURTLE_CHARACTERS_PASSWORD_5', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => false,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        'mysql9' => [
            'driver' => env('DB_CONNECTION_9'),
            'url' => env('DATABASE_URL'),
            'host' => env('DB_TURTLE_CHARACTERS_HOST_6', '127.0.0.1'),
            'port' => env('DB_TURTLE_CHARACTERS_PORT_6', '3306'),
            'database' => env('DB_TURTLE_CHARACTERS_DATABASE_6', 'characters'),
            'username' => env('DB_TURTLE_CHARACTERS_USERNAME_6', 'turtle'),
            'password' => env('DB_TURTLE_CHARACTERS_PASSWORD_6', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => false,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        'mysql10' => [
            'driver' => env('DB_CONNECTION_10'),
            'url' => env('DATABASE_URL'),
            'host' => env('DB_TURTLE_FORUM_HOST', '127.0.0.1'),
            'port' => env('DB_TURTLE_FORUM_PORT', '3306'),
            'database' => env('DB_TURTLE_FORUM_DATABASE', 'characters'),
            'username' => env('DB_TURTLE_FORUM_USERNAME', 'turtle'),
            'password' => env('DB_TURTLE_FORUM_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => false,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        'mysql11' => [
            'driver' => env('DB_CONNECTION_11'),
            'url' => env('DATABASE_URL'),
            'host' => env('DB_TURTLE_REPLICATION_CHARACTERS_HOST_1', '127.0.0.1'),
            'port' => env('DB_TURTLE_REPLICATION_CHARACTERS_PORT_1', '3306'),
            'database' => env('DB_TURTLE_REPLICATION_CHARACTERS_DATABASE_1', 'characters'),
            'username' => env('DB_TURTLE_REPLICATION_CHARACTERS_USERNAME_1', 'turtle'),
            'password' => env('DB_TURTLE_REPLICATION_CHARACTERS_PASSWORD_1', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => false,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        'mysql12' => [
            'driver' => env('DB_CONNECTION_12'),
            'url' => env('DATABASE_URL'),
            'host' => env('DB_TURTLE_REPLICATION_CHARACTERS_HOST_2', '127.0.0.1'),
            'port' => env('DB_TURTLE_REPLICATION_CHARACTERS_PORT_2', '3306'),
            'database' => env('DB_TURTLE_REPLICATION_CHARACTERS_DATABASE_2', 'characters'),
            'username' => env('DB_TURTLE_REPLICATION_CHARACTERS_USERNAME_2', 'turtle'),
            'password' => env('DB_TURTLE_REPLICATION_CHARACTERS_PASSWORD_2', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => false,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        'mysql13' => [
            'driver' => env('DB_CONNECTION_13'),
            'url' => env('DATABASE_URL'),
            'host' => env('DB_TURTLE_REPLICATION_CHARACTERS_HOST_3', '127.0.0.1'),
            'port' => env('DB_TURTLE_REPLICATION_CHARACTERS_PORT_3', '3306'),
            'database' => env('DB_TURTLE_REPLICATION_CHARACTERS_DATABASE_3', 'characters'),
            'username' => env('DB_TURTLE_REPLICATION_CHARACTERS_USERNAME_3', 'turtle'),
            'password' => env('DB_TURTLE_REPLICATION_CHARACTERS_PASSWORD_3', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => false,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        'mysql14' => [
            'driver' => env('DB_CONNECTION_14'),
            'url' => env('DATABASE_URL'),
            'host' => env('DB_TURTLE_REPLICATION_CHARACTERS_HOST_4', '127.0.0.1'),
            'port' => env('DB_TURTLE_REPLICATION_CHARACTERS_PORT_4', '3306'),
            'database' => env('DB_TURTLE_REPLICATION_CHARACTERS_DATABASE_4', 'characters'),
            'username' => env('DB_TURTLE_REPLICATION_CHARACTERS_USERNAME_4', 'turtle'),
            'password' => env('DB_TURTLE_REPLICATION_CHARACTERS_PASSWORD_4', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => false,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        'mysql15' => [
            'driver' => env('DB_CONNECTION_15'),
            'url' => env('DATABASE_URL'),
            'host' => env('DB_TURTLE_REPLICATION_CHARACTERS_HOST_5', '127.0.0.1'),
            'port' => env('DB_TURTLE_REPLICATION_CHARACTERS_PORT_5', '3306'),
            'database' => env('DB_TURTLE_REPLICATION_CHARACTERS_DATABASE_5', 'characters'),
            'username' => env('DB_TURTLE_REPLICATION_CHARACTERS_USERNAME_5', 'turtle'),
            'password' => env('DB_TURTLE_REPLICATION_CHARACTERS_PASSWORD_5', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => false,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        'mysql16' => [
            'driver' => env('DB_CONNECTION_16'),
            'url' => env('DATABASE_URL'),
            'host' => env('DB_TURTLE_REPLICATION_CHARACTERS_HOST_6', '127.0.0.1'),
            'port' => env('DB_TURTLE_REPLICATION_CHARACTERS_PORT_6', '3306'),
            'database' => env('DB_TURTLE_REPLICATION_CHARACTERS_DATABASE_6', 'characters'),
            'username' => env('DB_TURTLE_REPLICATION_CHARACTERS_USERNAME_6', 'turtle'),
            'password' => env('DB_TURTLE_REPLICATION_CHARACTERS_PASSWORD_6', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => false,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        'pgsql' => [
            'driver' => 'pgsql',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '5432'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'search_path' => 'public',
            'sslmode' => 'prefer',
        ],

        'sqlsrv' => [
            'driver' => 'sqlsrv',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST', 'localhost'),
            'port' => env('DB_PORT', '1433'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            // 'encrypt' => env('DB_ENCRYPT', 'yes'),
            // 'trust_server_certificate' => env('DB_TRUST_SERVER_CERTIFICATE', 'false'),
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Migration Repository Table
    |--------------------------------------------------------------------------
    |
    | This table keeps track of all the migrations that have already run for
    | your application. Using this information, we can determine which of
    | the migrations on disk haven't actually been run in the database.
    |
    */

    'migrations' => 'migrations',

    /*
    |--------------------------------------------------------------------------
    | Redis Databases
    |--------------------------------------------------------------------------
    |
    | Redis is an open source, fast, and advanced key-value store that also
    | provides a richer body of commands than a typical key-value system
    | such as APC or Memcached. Laravel makes it easy to dig right in.
    |
    */

    'redis' => [

        'client' => env('REDIS_CLIENT', 'phpredis'),

        'options' => [
            'cluster' => env('REDIS_CLUSTER', 'redis'),
            'prefix' => env('REDIS_PREFIX', Str::slug(env('APP_NAME', 'laravel'), '_').'_database_'),
        ],

        'default' => [
            'url' => env('REDIS_URL'),
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'username' => env('REDIS_USERNAME'),
            'password' => env('REDIS_PASSWORD'),
            'port' => env('REDIS_PORT', '6379'),
            'database' => env('REDIS_DB', '0'),
        ],

        'cache' => [
            'url' => env('REDIS_URL'),
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'username' => env('REDIS_USERNAME'),
            'password' => env('REDIS_PASSWORD'),
            'port' => env('REDIS_PORT', '6379'),
            'database' => env('REDIS_CACHE_DB', '1'),
        ],

    ],

];
