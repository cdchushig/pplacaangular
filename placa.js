var mainApp = angular.module('mainApp', []);         
mainApp.controller('placaController', function($scope) {
    $scope.checkPicoPlaca = function(){
        
        var license = $scope.licenseNumber;
        var last = getLastDigit(license);
        var inputDate = $scope.currentDate;
        var currentDate = new Date(inputDate);
        var auxDate = new Date(inputDate);

        checkAppPicoPlaca();
        
        /**
         * Main funtion of app
         */
        function checkAppPicoPlaca() {
            if (validatePlaca(license)) {
                console.log('OK NUMBER LICENSE!');
                checkDayPicoPlaca(currentDate, license);
            } else {
                console.log('NOT VALID NUMBER LICENSE');
                alert('NOT valid number license');
            }
        }

        /**
         * Validate format of license number
         * @author cdchushig
         */
        function validatePlaca(placa) {
            var regex = /^[A-Z]{3}[0-9]{3}$/;
            var isValid = regex.test(placa);
            return isValid;
        }

        /**
         * Check if licenseNumber is in picoplaca
         * @author cdchushig
         */
        function checkDayPicoPlaca(currentDate, license) {
            var isAllowedRoad = true;
            var dayCode = currentDate.getDay();   //0-6

            console.log('license', license);

            if (isNaN(dayCode)) {
                alert('It is mandatory the hour and minute');
            } 
            if (isMatchedDayPico(dayCode, getLastDigit(license))) {
                isAllowedRoad = checkHourPicoPlaca(auxDate);
            }
            console.log('Can you road?', isAllowedRoad);
            alert('Can you road? ' + isAllowedRoad);
        }

        /**
         * Check if number license is in state picoplaca
         * @author cdchushig
         */
        function isMatchedDayPico(dCode, lastDigit) {
            var isMatched = false;
            var dayCode = dCode * 2;
            var dayCodePrev = getNumberType(dayCode);
            if (dayCode === 10) {
                dayCode = 9;
            }
            if (lastDigit == dayCode || lastDigit == dayCodePrev) {
                isMatched = true;
            }
            return isMatched;
        }

        /**
         * Get number type for license number
         * @author cdchushig
         */
        function getNumberType(lastDigit) {
            var nType = lastDigit;
            if (lastDigit === 10) {
                nType = 0;
            } else {
                nType -= 1;
            }
            return nType;
        }

        /**
         * Check number license is valid
         * @author cdchushig
         */
        function checkLicenseFormat(license) {
            var isValid = true;
            return isValid;
        }

        /**
         * Get the last digit of a number
         * @author cdchushig
         */
        function getLastDigit(number) {
            //return number % 10;
            return number.slice(-1);
        }

        /**
         * Check if car is in hour
         * @author cdchushig
         */
        function checkHourPicoPlaca(auxDate) {
            var isAllowed = true;
            if (checkRangeMorning(auxDate) || checkRangeAfternoon(auxDate)) {
                console.log("State: PICO PLACA");
                isAllowed = false;
            }
            return isAllowed;
        }

        function checkRangeMorning(aux) {
            return checkRange(aux, 07, 09);
        }

        function checkRangeAfternoon(aux) {
            return checkRange(aux, 16, 19);
        }

        /**
         * Check range between two hours
         * @author cdchushig
         */
        function checkRange(aux, minH, maxH) {
            var isAllowed = false;
                // limit min
            var min = new Date(aux);
            min.setHours(minH);
            min.setMinutes(0);
            // limit max
            var max = new Date(aux);
            max.setHours(maxH);
            max.setMinutes(30);
            if(aux > min && aux < max) {
                isAllowed = true;
            }
            console.log('val', isAllowed);
            return isAllowed;
        }

    }
 
});