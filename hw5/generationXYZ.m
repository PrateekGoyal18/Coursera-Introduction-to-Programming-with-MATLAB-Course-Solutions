function gen = generationXYZ(a)
if a < 1966
    gen = 'O';
elseif a >= 1966 && a <= 1980
    gen = 'X';
elseif a >= 1981 && a <= 1999
    gen = 'Y';
elseif a >= 2000 && a <= 2012
    gen = 'Z';
elseif a > 2012
    gen = 'K';
end