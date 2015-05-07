clear

if make
        echo ":)"
else
        echo ":("
        end

while true
        inotifywait -e close_write,moved_to,create src > /dev/null ^&1
        clear
        if make
                echo ":)"
        else
                echo ":("
        end
end
