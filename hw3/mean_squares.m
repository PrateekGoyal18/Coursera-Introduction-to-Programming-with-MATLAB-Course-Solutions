function mm=mean_squares(nn)
mm=0;
for i=1:nn
    mm=mm+(i^2);
end
mm=mm/i;



function mm = mean_squares(nn)
 
    mm = mean((1:nn).^2);
end
 