function p = prime_pairs(n)
V = primes(1e5);
V = V(isprime(n+V));
if isempty(V)
	p = -1;
else
	p = V(1);
end
end