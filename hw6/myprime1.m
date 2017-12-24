function p = myprime(n)
if n==2
    p=true;
elseif n==3
    p=true;
else 
    for i=2:fx(n)
        if mod(n,i)==0
            p=false;
            return;
        end
    end
end