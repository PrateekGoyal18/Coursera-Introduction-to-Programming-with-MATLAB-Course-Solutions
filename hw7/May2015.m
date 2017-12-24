function m = May2015
for i = 1:31
    [DateNumber, DateName] = weekday(datenum([2015 5 i]));
    m(i) = struct('month','May','date',i,'day', DateName);
end