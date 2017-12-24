function x = older(y1, m1, d1, y2, m2, d2)

if (y1 == y2)
    if (m1 == m2)
        if (d1 == d2)
            x = 0;
        elseif (d1 > d2)
            x = -1;
        else
            x = 1;
        end
    elseif (m1 > m2)
        x = -1;
    else
        x = 1;
    end
elseif (y1 > y2)
    x = -1;
else
    x = 1;
end
end