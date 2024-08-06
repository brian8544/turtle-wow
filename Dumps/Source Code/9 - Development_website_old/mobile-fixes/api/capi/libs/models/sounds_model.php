<?php

class sounds_model extends model
{

    public function get()
    {

        $rd = [];
        $path = "../sounds/";
        $dirs = scandir($path);

        foreach ($dirs as $key => $d) {

            if ($d != '.' && $d != '..')
            {

                $rd[$key] = [];
                $rd[$key]['name'] = $d;
                $files = scandir($path . $d);
                foreach ($files as $key2 => $f) {
                    if ($f != '.' && $f != '..') {
                        if (stristr($f, '_')) {
                            $ex = explode('_', $f);
                            $rd[$key]['sounds'][] = [
                                'title' => ucfirst($ex[0]),
                                'subtitle' => str_replace('.wav', '', ucfirst($ex[1])),
                                'file' => str_replace('../', '', $path) . $d . '/' . $f,
                            ];
                        } else {
                            $rd[$key]['sounds'][] = [
                                'title' => str_replace('.wav', '', $f),
                                'subtitle' => str_replace('.wav', '', $f),
                                'file' => str_replace('../', '', $path) . $d . '/' . $f,
                            ];
                        }
                    }
                }
            }

        }

        return $rd;

    }

}
