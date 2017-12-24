function M=bottom_left(N,n)
M=N(end-n+1:end,1:n);



function M = bottom_left(N,n)
 
    M = N(end-n+1:end, 1:n);
end

%We need the last n rows and the first n columns. 
%The only trick here is that we need end-n+1, because end-n:end would get us n+1 indexes and not n as required.