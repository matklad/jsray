clear

if ~/node_modules/.bin/traceur --experimental --out js/main.js src/main.js
        echo ":)"
else
        echo ":("
        end

~/node_modules/.bin/traceur --out js/worker-impl.js src/worker.js
while true
        inotifywait -e close_write,moved_to,create src > /dev/null ^&1
        clear
        ~/node_modules/.bin/traceur --out js/worker-impl.js src/worker.js
        if ~/node_modules/.bin/traceur --experimental --out js/main.js src/main.js
                echo ":)"
        else
                echo ":("
        end
end
