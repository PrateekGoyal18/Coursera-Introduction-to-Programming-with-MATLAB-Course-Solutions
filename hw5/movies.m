function cando = movies(hr1,min1,durmin1,hr2,min2,durmin2)
cando = false;
endtime = hr1*60 + min1 + durmin1; % convert times to minutes
starttime = hr2*60 + min2;
if endtime <= starttime && endtime + 30 >= starttime % so we can compare them
cando = true;
end
end
