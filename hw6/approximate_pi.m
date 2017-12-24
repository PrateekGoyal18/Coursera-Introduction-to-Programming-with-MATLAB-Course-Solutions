function [pi_here , k1] = approximate_pi(delta)
k = 0;
pi_here = 0;
while abs(pi_here-pi)>delta
    pi_here = pi_here + sqrt(12)./((2*k+1).*(-3).^k);
    k = k+1;
end
k1 = k-1;
end