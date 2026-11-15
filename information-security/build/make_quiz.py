from pathlib import Path
import json,random
R=Path(__file__).resolve().parent.parent
lessons=[]
def lesson(file,title,subtitle,raw):
 cs=[]
 for row in raw.strip().splitlines():
  t,d,p,f=row.split('|');cs.append(dict(term=t,definition=d,slide=int(p),falsehood=f))
 lessons.append(dict(id=f'lesson-{len(lessons)+1}',file=file,title=title,subtitle=subtitle,concepts=cs))
lesson('AUTHENTICATION.pptx','Authentication and Hash Functions','Identity, message digests, and SHA-1','''
Authentication|The process of checking that a claimed identity or origin is genuine.|2|Authentication means granting permissions without checking any identity.
Historical wax seal|A seal could show signs of opening and carry an impression associated with a sender.|3|A wax seal mathematically proves that no forgery is possible.
Tamper evidence|Visible signs that a seal or message may have been altered or opened.|4|Tamper evidence guarantees that no attacker can imitate or replace a seal.
Hash function|A function that maps input data to a fixed-length digest for a chosen hash algorithm.|5|A fixed hash algorithm must produce longer digests for longer messages.
Message digest|The fixed-length output of a hash function, also called a hash value or hash.|5|A message digest is necessarily the original plaintext in readable form.
Hashing and encryption|Hashing produces a digest; encryption uses a key and is designed to be reversed by authorized parties.|5|Hashing and encryption are identical reversible operations.
Early hashing history|The slide credits Hans Peter Luhn with early hashing work used to organize and search records.|6|The slides describe early hashing as having no use in searching records.
Hash bucket|A group into which records can be placed to help organize lookup.|6|A hash bucket is a certificate that proves a sender's identity.
MD4 and MD5|Historical Message Digest algorithms named in the lesson; MD5 is unsuitable where collision resistance is needed.|7|MD4 and MD5 are current recommendations for new collision-resistant authentication designs.
SHA-1|A historical cryptographic hash algorithm producing a 160-bit digest and using 80 rounds per block.|16|SHA-1 produces a 512-bit digest and performs only one round per block.
SHA-2 and SHA-3|Families of modern hash algorithms that NIST recommends as alternatives to SHA-1.|7|NIST recommends adopting SHA-1 instead of SHA-2 and SHA-3 for new collision-resistant uses.
Hash sensitivity|A small change in input, including a change in letter case, generally produces a different cryptographic digest.|8|Changing letter case always leaves the input bytes and digest unchanged.
MD5 case example|The slide's MD5 digest for uppercase CCSICT is afa10b1e77998a5806a8b0fdff622b03.|9|The slide's MD5 example says that uppercase and lowercase inputs are necessarily identical bytes.
MD5 output length|MD5 produces a 128-bit digest, commonly displayed as 32 hexadecimal characters.|10|MD5's digest length grows in direct proportion to the input length.
Fixed-length digest|A particular hash algorithm returns the same output length even when input messages have different lengths.|11|A longer message always makes MD5 return more than 128 bits.
Input comparison exercise|Comparing hashes of nearly identical messages illustrates that a small change can produce a very different digest.|12|The same hash algorithm must output almost identical digests for nearly identical messages.
Integrity check|Comparing a computed digest against a trusted expected digest can reveal accidental or intentional changes.|12|A checksum comparison can identify changes even if an attacker can replace both the message and its expected digest.
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
Security evaluation|Assessing how well an algorithm resists attacks and protects data, considering evidence such as cryptanalysis and performance.|2|A single runtime measurement completely proves an algorithm is secure.
Processing time|The time required to perform an operation; it is a performance consideration distinct from security strength.|2|A faster algorithm is automatically more secure than every slower algorithm.
Avalanche effect|A property where a small input change can cause a substantial, unpredictable change in a cryptographic output.|3|The avalanche effect means every output bit remains unchanged after any input bit changes.
Single-bit input change|Flipping one input bit is a common controlled way to study the avalanche effect.|3|A controlled avalanche test must change every input bit at once.
Ciphertext|The encrypted output produced by an encryption algorithm under a particular key and configuration.|4|Ciphertext is the original unencrypted message by definition.
Blowfish|A symmetric-key block cipher with a 64-bit block size; the lesson uses it as an example for comparison.|4|Blowfish has a 128-bit block size.
Controlled comparison|Compare outputs from the same algorithm and key with settings held constant while changing the intended input bit.|4|A fair avalanche experiment should change the input, key, mode, and IV all at once.
Reproducibility settings|To reproduce encrypted output, specify the key, mode, IV or nonce when applicable, encoding, and padding.|4|Knowing only a plaintext and the algorithm name always determines a unique ciphertext.
Input case change|In ASCII-compatible encoding, uppercase I and lowercase i differ by one bit: 0x49 XOR 0x69 equals 0x20.|4|ASCII uppercase I and lowercase i differ in every bit of their byte values.
Hexadecimal digit|One hexadecimal digit represents four bits, so 32 hexadecimal digits represent 128 bits.|6|A hexadecimal digit represents exactly one bit.
XOR comparison|XOR corresponding output bits; the 1 bits in the result mark positions where the outputs differ.|5|XOR produces a 1 when the two corresponding input bits are equal.
Hamming distance|The number of bit positions at which two equal-length bit strings differ.|5|Hamming distance counts only how many hexadecimal digits look different, without checking individual bits.
Avalanche percentage formula|Changed output bits divided by total compared output bits, multiplied by 100.|6|Avalanche percentage is the number of changed bits multiplied by the total number of bits.
Slide ciphertext comparison|The two hexadecimal ciphertexts printed in the slide differ in 30 of 128 bit positions.|6|The two printed ciphertexts differ in 31 bit positions.
Corrected slide percentage|30 divided by 128, multiplied by 100, equals 23.4375%, approximately 23.44%.|6|The two printed ciphertexts show exactly 50% changed bits.
Unchanged second block|In the slide's printed two-block strings, the second 64-bit ciphertext block is identical in both outputs.|4|Both 64-bit ciphertext blocks printed in the slide change completely.
Block-level comparison|For the slide's printed first 64-bit blocks, 30 of 64 bits differ, or 46.875%; this is distinct from comparing all 128 bits.|6|The printed first-block comparison is 30 changed bits out of 128 bits.
Ideal 50% interpretation|For an ideal avalanche response, each output bit changes with probability about one-half over many suitable trials.|6|Every single valid avalanche test must change at least exactly 50% of output bits to be secure.
Many-trial evaluation|Use multiple independent controlled input changes and inspect the distribution of changed output bits.|6|One measured percentage is sufficient to establish an algorithm's security.
Avalanche is not proof|Avalanche behavior is one useful property but does not by itself prove cryptographic security.|6|Passing an avalanche test proves an algorithm is secure against all attacks.
Mode and block boundaries|Encryption mode, padding, and block boundaries affect what is compared across multi-block ciphertexts.|4|The mode of operation cannot affect how a change propagates across ciphertext blocks.
One-round comparison|The assignment asks to compare avalanche behavior after the first round of original and enhanced Blowfish.|7|The assignment asks only for a final ciphertext and rules out first-round analysis.
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
  truth=i%2==0
  qs.append(dict(base,id=l['id']+'-c'+str(i)+'-tf',kind='tf',prompt=c['term']+': '+c['definition'] if truth else c['falsehood'],options=['True','False'],answer=0 if truth else 1))
 l['questions']=qs
(R/'build/question-bank.json').write_text(json.dumps(lessons,ensure_ascii=False,indent=2))
(R/'quiz.html').write_text((R/'build/template.html').read_text().replace('__DATA__',json.dumps(lessons,ensure_ascii=False).replace('</','<\\/')))
print([(l['title'],len(l['concepts'])) for l in lessons])
