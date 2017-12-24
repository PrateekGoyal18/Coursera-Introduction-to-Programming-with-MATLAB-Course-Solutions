function A = June2015
A=cell(30,3)%declar cell array of 30 by 3
for i = 1:30
    [DateNumber, DateName] = weekday(datenum([2015 6 i]));
 % making the value of DateNume for DateNumber and loop run number of rows in cell array
  A(i,:) = {'June', i, 'DateName'} ;
    end
end