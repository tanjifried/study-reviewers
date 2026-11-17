from pathlib import Path
import json,random
R=Path(__file__).resolve().parent.parent
lessons=[]
DROP={'32-bit left rotation', 'Corrected slide percentage', 'Tamper evidence', 'Early hashing history', 'SHA-1 first-round example', 'SHA-1 schedule note', 'One-round comparison', 'Block-level comparison', 'Hash bucket', 'MD5 case example', 'Hexadecimal digit', 'Single-bit input change', 'SHA-1 first rotation example', 'Historical wax seal', 'Fixed-length digest', 'Input comparison exercise', 'SHA-1 worked message', 'Processing time', 'Input case change', 'SHA-1 padded sample', 'Slide ciphertext comparison', 'SHA-1 state update', 'Unchanged second block', 'MD4 meaning'}
def lesson(file,title,subtitle,raw):
 cs=[]
 for row in raw.strip().splitlines():
  t,d,p,f=row.split('|')
  if t in DROP: continue
  cs.append(dict(term=t,definition=d,slide=int(p),falsehood=f))
 lessons.append(dict(id=f'lesson-{len(lessons)+1}',file=file,title=title,subtitle=subtitle,concepts=cs))
lesson('AUTHENTICATION.pptx','Authentication and Hash Functions','Identity, message digests, and SHA-1','''
Authentication|The process of verifying identity; it can validate identity documents or ensure that a product or document is not forged.|2|Authentication means granting permissions without checking any identity.
Historical wax seal|A wax seal bonds to paper, parchment, ribbons, wire, or other material and is difficult to separate without noticeable tampering.|3|A wax seal mathematically proves that no forgery is possible.
Tamper evidence|A wax bond is difficult to separate without noticeable tampering; wax can verify that a document is unopened.|4|A wax seal guarantees that no attacker can imitate or replace it.
Hash function|A function that maps data of any size to fixed-size values.|5|A fixed hash algorithm must produce longer digests for longer messages.
Message digest|The values returned by a hash function are called hash values, hash codes, digests, or hashes.|5|A message digest is necessarily the original plaintext in readable form.
Hashing and encryption|Hashing produces a digest; encryption uses a key and is designed to be reversed by authorized parties.|5|Hashing and encryption are identical reversible operations.
Early hashing history|Hans Peter Luhn's method aimed to speed up searching a telephone directory of over a million records.|6|The slides describe early hashing as having no use in searching records.
Hash bucket|Luhn's method put related information in a single “bucket” to speed up searching.|6|A hash bucket is a certificate that proves a sender's identity.
MD4 and MD5|MD4 (Message Digest 4) and MD5 (Message Digest 5) are hash algorithms named on the slide.|7|MD4 and MD5 are encryption algorithms rather than hash algorithms.
SHA-1|SHA-1 (Secure Hash Algorithm 1) uses 80 rounds and has a hash value of 160 bits.|16|SHA-1 produces a 512-bit digest and performs only one round.
SHA-2 and SHA-3|The slide names SHA-3 (512) among the latest and strongest hash algorithms at the time.|7|The slide names SHA-1 as the latest and strongest hash algorithm at the time.
Hash sensitivity|The MD5 hash algorithm is case sensitive: the hash value differs when the same word or phrase uses lowercase and uppercase.|8|Changing letter case always leaves the hash value unchanged.
MD5 case example|The slide's MD5 hash value for CCSICT (all caps) is afa10b1e77998a5806a8b0fdff622b03.|9|The slide gives a different MD5 hash value for CCSICT (all caps): 00000000000000000000000000000000.
MD5 output length|Supplemental reference: MD5 produces a 128-bit digest, commonly displayed as 32 hexadecimal characters.|10|MD5's digest length grows in direct proportion to the input length.
Fixed-length digest|A hash function maps data of any size to fixed-size values.|11|A longer message always makes the hash function return a longer value.
Input comparison exercise|The MD5 hash value differs when the same word or phrase uses lowercase and uppercase.|12|The same hash algorithm must output identical hash values for uppercase and lowercase inputs.
Integrity check|Supplemental: comparing a computed digest with a trusted expected digest can reveal changes to the message.|12|Comparing a digest against an untrusted replacement always proves the message was unchanged.
Authenticated integrity|An HMAC or digital signature can protect message integrity and help authenticate the source when keys are managed correctly.|12|A plain unkeyed hash sent alongside a message by itself authenticates the sender against an active attacker.
MD4 meaning|MD4 stands for Message Digest 4 and is an older hash algorithm.|13|MD4 is the name of a modern authentication factor rather than a hash algorithm.
SHA-1 digest size|SHA-1 outputs 160 bits, equivalent to 20 bytes or 40 hexadecimal digits.|16|SHA-1 outputs 160 hexadecimal digits for every message.
SHA-1 block size|SHA-1 processes padded messages in 512-bit blocks.|17|SHA-1 processes a padded block containing only five bits.
SHA-1 initial words|SHA-1 starts with five 32-bit state words, often named H0 through H4 or A through E.|17|The initial SHA-1 state consists of one 512-bit word and no named working variables.
SHA-1 initial parsing|A 512-bit message block is parsed into sixteen 32-bit words before the schedule is expanded.|17|A 512-bit SHA-1 block is initially parsed into sixteen 64-bit words.
SHA-1 padding|Append a 1 bit, then zero bits, then the original message length encoded in 64 bits to reach a multiple of 512 bits.|17|SHA-1 padding consists only of zeros and never includes the original message length.
SHA-1 schedule expansion|For t from 16 to 79, W[t] is a one-bit left rotation of W[t-3] XOR W[t-8] XOR W[t-14] XOR W[t-16].|17|SHA-1 expands W[t] using W[t-13] in place of W[t-3].
SHA-1 round function|The round function changes across four 20-round ranges; the first uses (B AND C) OR ((NOT B) AND D).|17|The first SHA-1 round function omits NOT B from its second term.
SHA-1 constants|Each of four SHA-1 round ranges uses a specified constant, beginning with 5a827999 for rounds 0–19.|17|Every SHA-1 round uses the same constant regardless of its range.
SHA-1 schedule note|The lecture's printed schedule and first-round function contain typos; use the standard formulas in the explanation.|17|Every formula and range printed on the lecture's SHA-1 properties slide is error-free.
SHA-1 worked message|The sample hexadecimal message 1a7fd53b4c is five bytes, or 40 bits long.|18|The hexadecimal message 1a7fd53b4c contains 128 bits.
SHA-1 padded sample|For the sample message, W0 is 1a7fd53b, W1 begins 4c800000, and the final length word is 00000028.|18|The sample's encoded length word 00000028 represents 28 decimal bits.
SHA-1 state update|In the first round, the old A becomes new B and rotating the old B left by 30 bits gives new C.|19|In a SHA-1 round, the previous A is discarded without affecting any new state word.
32-bit left rotation|A rotate-left moves bits around a fixed 32-bit word, wrapping the bits that leave the left end back to the right.|20|A 32-bit rotate-left permanently discards all bits shifted out of the word.
SHA-1 first rotation example|Rotating efcdab89 left by 30 bits produces 7bf36ae2.|20|Rotating efcdab89 left by 30 bits produces 00000000.
SHA-1 first-round example|With the slide's sample and standard initial state, the first new A is ba346dee.|21|The worked first SHA-1 round gives a new A value of 00000000.
SHA-1 security status|SHA-1 has collision weaknesses; NIST recommends transitioning to SHA-2 or SHA-3.|16|SHA-1 is recommended for new digital signatures because it is collision resistant.
''')
lesson('AVALANCHE-EFFECT-COMPUTATION.pptx','Avalanche Effect Computation','Compare ciphertext bits and interpret the result','''
Security evaluation|A critical process to assess how well an algorithm resists attacks and protects data.|2|A single runtime measurement completely proves an algorithm is secure.
Processing time|The slide lists processing time and says fast processing is always ideal.|2|The slide says slow processing is always ideal.
Avalanche effect|A phenomenon where a small change in input leads to a significant change in output; flipping a single bit can cause this change.|3|The avalanche effect means a small change in input always leaves the output unchanged.
Single-bit input change|Flipping one input bit is a common controlled way to study the avalanche effect.|3|A controlled avalanche test must change every input bit at once.
Ciphertext|The encrypted result generated by the Blowfish algorithm for an input.|4|Ciphertext is the original unencrypted message by definition.
Blowfish|A symmetric-key block cipher with a 64-bit block size; the lesson uses it as an example for comparison.|4|Blowfish has a 128-bit block size.
Controlled comparison|Compare outputs from the same algorithm and key with settings held constant while changing the intended input bit.|4|A fair avalanche experiment should change the input, key, mode, and IV all at once.
Reproducibility settings|To reproduce encrypted output, specify the key, mode, IV or nonce when applicable, encoding, and padding.|4|Knowing only a plaintext and the algorithm name always determines a unique ciphertext.
Input case change|The slide modifies the input from ISUECCSICT to iSUECCSICT.|4|The slide modifies the input from ISUECCSICT to ISUECCSICT.
Hexadecimal digit|The slide counts 32 hexadecimal numbers as 128 bits (32 hexadecimal numbers × 4 bits).|6|The slide counts 32 hexadecimal numbers as 32 bits.
XOR comparison|XOR corresponding output bits; the 1 bits in the result mark positions where the outputs differ.|5|XOR produces a 1 when the two corresponding input bits are equal.
Hamming distance|The number of bit positions at which two equal-length bit strings differ.|5|Hamming distance counts only how many hexadecimal digits look different, without checking individual bits.
Avalanche percentage formula|The formula uses changed bits divided by total bits, multiplied by 100.|6|The formula uses total bits divided by changed bits, multiplied by 100.
Slide ciphertext comparison|Corrected comparison of the slide's two ciphertexts: 30 of 128 bits differ.|6|The two printed ciphertexts differ in 31 bit positions.
Corrected slide percentage|30 divided by 128, multiplied by 100, equals 23.4375%, approximately 23.44%.|6|The two printed ciphertexts show exactly 50% changed bits.
Unchanged second block|In the slide's printed two-block strings, the second 64-bit ciphertext block is identical in both outputs.|4|Both 64-bit ciphertext blocks printed in the slide change completely.
Block-level comparison|For the slide's printed first 64-bit blocks, 30 of 64 bits differ, or 46.875%; this is distinct from comparing all 128 bits.|6|The printed first-block comparison is 30 changed bits out of 128 bits.
Ideal 50% interpretation|The slide says the ideal avalanche effect should be at least 50% or above.|6|The slide says the ideal avalanche effect should be below 50%.
Many-trial evaluation|Use multiple independent controlled input changes and inspect the distribution of changed output bits.|6|One measured percentage is sufficient to establish an algorithm's security.
Avalanche is not proof|Avalanche behavior is one useful property but does not by itself prove cryptographic security.|6|Passing an avalanche test proves an algorithm is secure against all attacks.
Mode and block boundaries|Encryption mode, padding, and block boundaries affect what is compared across multi-block ciphertexts.|4|The mode of operation cannot affect how a change propagates across ciphertext blocks.
One-round comparison|The assessment task asks to perform avalanche effect to the 1st round of the enhanced Blowfish algorithm and compare it to the original algorithm for the 1st round.|7|The assessment task asks to compare only the final rounds of the enhanced and original Blowfish algorithms.
Statistical randomness testing|Testing output statistics can provide evidence about patterns, but passing tests alone does not establish security.|7|Passing a randomness test proves a cipher cannot have exploitable weaknesses.
''')
rng=random.Random(180)
for l in lessons:
 qs=[]
 for i,c in enumerate(l['concepts']):
  others=rng.sample([x for x in l['concepts'] if x!=c],3)
  if i%2==0: prompt='Which term best matches this description? '+c['definition'];options=[c['term']]+[x['term'] for x in others]
  else: prompt='Which statement best describes '+c['term']+'?';options=[c['definition']]+[x['definition'] for x in others]
  correct=options[0];rng.shuffle(options)
  base=dict(lesson=l['id'],concept=c['term'],explanation=c['term']+': '+c['definition'],slide=c['slide'])
  qs.append(dict(base,id=l['id']+'-c'+str(i)+'-mc',kind='mc',prompt=prompt,options=options,answer=options.index(correct)))
 l['questions']=qs
(R/'build/question-bank.json').write_text(json.dumps(lessons,ensure_ascii=False,indent=2))
(R/'quiz.html').write_text((R/'build/template.html').read_text().replace('__DATA__',json.dumps(lessons,ensure_ascii=False).replace('</','<\\/')))
print([(l['title'],len(l['concepts'])) for l in lessons])
